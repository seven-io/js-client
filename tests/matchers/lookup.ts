import unionMatcher from '../lib/unionMatcher';
import {
    HLR_PORTED_CODES,
    HLR_REACHABLE_CODES,
    HLR_ROAMING_CODES,
    HLR_STATUS_MESSAGE_CODES,
    HLR_VALID_NUMBER_CODES,
    ROAMING_STATUS_CODES,
    STRING_RESPONSE_CODES
} from '../../src/constants/byEndpoint/lookup';
import {
    Carrier,
    CNAMApiJsonResponse,
    Format,
    HLR,
    MNPApiJsonResponse,
    Roaming
} from '../../src/types';
import STRING_BOOLEAN_VALUES from '../../src/constants/STRING_BOOLEAN_VALUES';
import {LOOKUP_GSM_CODES} from '../../src/constants/byEndpoint/lookup/LOOKUP_GSM_CODES';
import getStringEnumValues from '../lib/getStringEnumValues';
import {NetworkType} from '../../src/constants/byEndpoint/lookup/NetworkType';

export const lookupCnamMatcher: CNAMApiJsonResponse = {
    code: expect.stringMatching(unionMatcher(STRING_RESPONSE_CODES)),
    name: expect.any(String),
    number: expect.any(String),
    success: expect.stringMatching(unionMatcher(STRING_BOOLEAN_VALUES)),
};

export const lookupHlrMatcher = (res: HLR): HLR => {
    const carrierMatcher: Carrier = {
        country: expect.any(String),
        name: expect.any(String),
        network_code: expect.any(String),
        network_type: expect.any(String),
    };

    const hlr: HLR = {
        country_code: expect.any(String),
        country_name: expect.any(String),
        country_prefix: expect.any(String),
        current_carrier: carrierMatcher,
        gsm_code: expect.stringMatching(unionMatcher(LOOKUP_GSM_CODES)),
        gsm_message: expect.any(String),
        lookup_outcome: typeof res.lookup_outcome === 'boolean'
            ? expect.any(Boolean) : expect.any(Number),
        lookup_outcome_message: expect.any(String),
        international_format_number: expect.any(String),
        international_formatted: expect.any(String),
        national_format_number: expect.any(String),
        original_carrier: carrierMatcher,
        ported: expect.stringMatching(unionMatcher(HLR_PORTED_CODES)),
        reachable: expect.stringMatching(unionMatcher(HLR_REACHABLE_CODES)),
        roaming: typeof res.roaming === 'string'
            ? expect.stringMatching(unionMatcher(HLR_ROAMING_CODES))
            : expect.objectContaining<Roaming>({
                roaming_country_code: expect.any(String),
                roaming_network_code: expect.any(String),
                roaming_network_name: expect.any(String),
                status: expect.stringMatching(unionMatcher(ROAMING_STATUS_CODES)),
            }),
        status: expect.any(Boolean),
        status_message: expect.stringMatching(unionMatcher(HLR_STATUS_MESSAGE_CODES)),
        valid_number: expect.stringMatching(unionMatcher(HLR_VALID_NUMBER_CODES)),
    };

    if ('country_code_iso3' in res) {
        hlr.country_code_iso3 = expect.any(String);
    }

    return hlr;
};

export const lookupMnpMatcher: MNPApiJsonResponse = {
    code: expect.any(Number),
    mnp: {
        country: expect.any(String),
        international_formatted: expect.any(String),
        isPorted: expect.any(Boolean),
        mccmnc: expect.any(String),
        national_format: expect.any(String),
        network: expect.any(String),
        number: expect.any(String),
    },
    price: expect.any(Number),
    success: expect.any(Boolean),
};

export const lookupFormatMatcher: Format = {
    carrier: expect.any(String),
    country_code: expect.any(String),
    country_iso: expect.any(String),
    country_name: expect.any(String),
    international: expect.any(String),
    international_formatted: expect.any(String),
    national: expect.any(String),
    network_type: expect.stringMatching(unionMatcher(getStringEnumValues(NetworkType))),
    success: expect.any(Boolean),
};