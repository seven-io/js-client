import {PRICING_FORMATS} from '../constants/byEndpoint/pricing';

export type CountryNetwork = {
    comment: string
    features: string[]
    mcc: string
    mncs: string[]
    networkName: string
    price: number
}

export type PricingParams = {
    country?: string
    format?: typeof PRICING_FORMATS[number]
}

export type CsvNetwork = CountryNetwork & Omit<CountryPricing, 'networks'>

export type CountryPricing = {
    countryCode: string
    countryName: string
    countryPrefix: string
    networks: CountryNetwork[]
}

export type PricingResponse = PricingResponseJson | string

export type PricingResponseJson = {
    countCountries: number
    countNetworks: number
    countries: CountryPricing[]
}