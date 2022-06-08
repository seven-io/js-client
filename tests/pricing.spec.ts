import './lib/afterEachWait';
import {
    CountryNetwork,
    CountryPricing,
    PricingParams,
    PricingResponseJson,
} from '../src/types';
import {
    pricingCountryNetworkMatcher,
    pricingCountryPricingMatcher,
    pricingMatcher
} from './matchers/pricing';
import CsvToJson from '../src/lib/TextTransformer';
import {dummyPricingJson} from './data/pricing/dummyPricingJson';
import Client from './lib/client';
import {dummyPricingCsv} from './data/pricing/dummyPricingCsv';
import Sms77Client from '../src/Sms77Client';

const pricing: Sms77Client['pricing'] = process.env.SMS77_LIVE_TEST
    ? Client.pricing : jest.fn(async (p?: PricingParams) =>
        'csv' === p?.format ? dummyPricingCsv : dummyPricingJson);

const assertObject = (res: PricingResponseJson): void => {
    const countryPricing = (p: CountryPricing): CountryPricing => ({
        ...pricingCountryPricingMatcher,
        networks: expect.arrayContaining<CountryNetwork>(
            Array(p.networks.length).fill(
                expect.objectContaining<CountryNetwork>(
                    pricingCountryNetworkMatcher))),
    });

    const countries = expect.arrayContaining(
        (res as PricingResponseJson).countries.map(
            p => expect.objectContaining<CountryPricing>(countryPricing(p)))
    );

    expect.objectContaining<PricingResponseJson>({
        ...pricingMatcher,
        countries,
    });
};

const assertResponse = async (p?: PricingParams): Promise<void> => {
    const res = await pricing(p);

    assertObject(typeof res === 'string' ? CsvToJson.pricing(res) : res);
};

const country: Pick<PricingParams, 'country'> = {country: 'DE'};
const csv: Pick<PricingParams, 'format'> = {format: 'csv'};

it('should return pricing from Germany as json',
    async () => await assertResponse(country));

describe('Pricing', () => {
    it('should return pricing from all countries as json',
        async () => await assertResponse());

    it('should return pricing from Germany as json',
        async () => await assertResponse(country));

    it('should return pricing from all countries as csv',
        async () => await assertResponse(csv));

    it('should return pricing from Germany as csv',
        async () => await assertResponse({...country, ...csv}));
});
