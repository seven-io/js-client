import client from './lib/client'
import {
    type CountryNetwork,
    type CountryPricing,
    type PricingParams,
    PricingResource,
    type PricingResponse
} from '../src'

const pricingCountryNetworkMatcher: CountryNetwork = {
    comment: expect.any(String),
    features: expect.any(Array),
    mcc: expect.any(String),
    mncs: expect.any(Array),
    networkName: expect.any(String),
    price: expect.any(Number),
}

const pricingCountryPricingMatcher: Omit<CountryPricing, 'networks'> = {
    countryCode: expect.any(String),
    countryName: expect.any(String),
    countryPrefix: expect.any(String),
}

const pricingMatcher: Omit<PricingResponse, 'countries'> = {
    countCountries: expect.any(Number),
    countNetworks: expect.any(Number),
}

const resource = new PricingResource(client)

const assertObject = (res: PricingResponse): void => {
    const countryPricing = (p: CountryPricing): CountryPricing => ({
        ...pricingCountryPricingMatcher,
        networks: expect.arrayContaining<CountryNetwork>(
            Array(p.networks.length).fill(
                expect.objectContaining<CountryNetwork>(
                    pricingCountryNetworkMatcher))),
    })

    const countries = expect.arrayContaining(
        res.countries.map(p => expect.objectContaining(countryPricing(p))),
    )

    expect.objectContaining<PricingResponse>({
        ...pricingMatcher,
        countries,
    })
}

const assertJSON = (json: PricingResponse): void => {
    assertObject(json)
}

const country: PricingParams = {country: 'DE'}

describe('Pricing', () => {
    it('should return pricing from all countries as json',
        async () => assertJSON(await resource.get()))

    it('should return pricing from Germany as json',
        async () => assertJSON(await resource.get(country)))
})
