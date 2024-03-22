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
}

export type CountryPricing = {
    countryCode: string
    countryName: string
    countryPrefix: string
    networks: CountryNetwork[]
}

export type PricingResponse = {
    countCountries: number
    countNetworks: number
    countries: CountryPricing[]
}
