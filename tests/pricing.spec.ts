import {CountryNetwork, CountryPricing, PricingParams, PricingResource, PricingResponse} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

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

jest.mock('../src', () => ({
    PricingResource: jest.fn().mockImplementation((): ResourceMock<PricingResource> => {
        return environment.live
            ? new PricingResource(client)
            : {
                get: async (p) => ({
                    countCountries: 1,
                    countNetworks: 4,
                    countries: [
                        {
                            countryCode: 'BR',
                            countryName: 'Brazil',
                            countryPrefix: '43',
                            networks: [
                                {
                                    mcc: '232',
                                    mncs: [
                                        '02',
                                    ],
                                    networkName: 'A1 Telekom Austria',
                                    price: 0.075,
                                    features: [],
                                    comment: '',
                                },
                                {
                                    mcc: '232',
                                    mncs: [
                                        '01',
                                    ],
                                    networkName: 'A1 Telekom Austria (A1.net)',
                                    price: 0.075,
                                    features: [
                                        'alpha',
                                        'numeric',
                                        'dlr',
                                        'sc',
                                    ],
                                    comment: '',
                                },
                                {
                                    mcc: '232',
                                    mncs: [
                                        '11',
                                    ],
                                    networkName: 'A1 Telekom Austria (bob)',
                                    price: 0.075,
                                    features: [],
                                    comment: '',
                                },
                                {
                                    mcc: '232',
                                    mncs: [
                                        '09',
                                    ],
                                    networkName: 'A1 Telekom Austria (Tele2Mobil)',
                                    price: 0.075,
                                    features: [],
                                    comment: '',
                                },
                            ],
                        },
                    ],
                }),
            }
    }),
}))

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
