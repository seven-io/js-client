import {
    CountryNetwork,
    CountryPricing,
    PricingResponseJson,
} from '../../src/types';

export const pricingCountryNetworkMatcher: CountryNetwork = {
    comment: expect.any(String),
    features: expect.any(Array),
    mcc: expect.any(String),
    mncs: expect.any(Array),
    networkName: expect.any(String),
    price: expect.any(Number),
};

export const pricingCountryPricingMatcher: Omit<CountryPricing, 'networks'> = {
    countryCode: expect.any(String),
    countryName: expect.any(String),
    countryPrefix: expect.any(String),
};

export const pricingMatcher: Omit<PricingResponseJson, 'countries'> = {
    countCountries: expect.any(Number),
    countNetworks: expect.any(Number),
};