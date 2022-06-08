import {
    Carrier, CNAMApiJsonResponse,
    Format, HLR,
    HLRApiResponse,
    MNPApiJsonResponse
} from '../../src/types';
import {NetworkType} from '../../src/constants/byEndpoint/lookup/NetworkType';

export const dummyLookupFormat: Format = {
    carrier: 'O2',
    country_code: '49',
    country_iso: 'DE',
    country_name: 'Germany',
    international: '+4917666666666',
    international_formatted: '+49 176 66666666',
    national: '0176 66666666',
    network_type: NetworkType.Mobile,
    success: true,
};

export const dummyLookupMnpText = 'o2';

export const dummyLookupMnpJson: MNPApiJsonResponse = {
    code: 100,
    mnp: {
        country: 'DE',
        international_formatted: '+49 176 66666666',
        isPorted: false,
        mccmnc: '26207',
        network: 'Telefónica Germany GmbH & Co. oHG (O2)',
        national_format: '0176 66666666',
        number: '+4917666666666',
    },
    price: 0.005,
    success: true,
};

const carrier: Carrier = {
    country: 'DE',
    name: 'Telefónica Germany GmbH & Co. oHG (O2)',
    network_code: '26203',
    network_type: NetworkType.Mobile
};

export const dummyLookupHlr: HLR = {
    country_code: 'DE',
    country_code_iso3: 'DEU',
    country_name: 'Germany',
    country_prefix: '49',
    current_carrier: carrier,
    gsm_code: '0',
    gsm_message: '',
    lookup_outcome: 0,
    lookup_outcome_message: 'Success',
    international_format_number: '491632429751',
    international_formatted: '+49 163 2429751',
    national_format_number: '0163 2429751',
    original_carrier: carrier,
    ported: 'assumed_not_ported',
    reachable: 'reachable',
    roaming: 'not_roaming',
    status: true,
    status_message: 'success',
    valid_number: 'valid',
};

export const dummyLookupCnam: CNAMApiJsonResponse = {
    code: '100',
    name: "TELEKOM SMS",
    number: "+4915126716517",
    success: 'true',

}