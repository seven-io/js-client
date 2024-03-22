import {
    Carrier,
    CnamResponse,
    Format,
    HLR,
    HLR_PORTED_CODES,
    HLR_REACHABLE_CODES,
    HLR_ROAMING_CODES,
    HLR_STATUS_MESSAGE_CODES,
    HLR_VALID_NUMBER_CODES,
    LOOKUP_GSM_CODES,
    LookupParams,
    LookupResource,
    MnpResponse,
    NetworkType,
    Roaming,
    ROAMING_STATUS_CODES,
    STRING_RESPONSE_CODES,
} from '../src'
import STRING_BOOLEAN_VALUES from '../src/lib/StringBooleanValues'
import client from './lib/client'
import environment from './lib/environment'
import {getStringEnumValues, ResourceMock, unionMatcher} from './lib/utils'

const lookupCnamMatcher: CnamResponse = {
    code: expect.stringMatching(unionMatcher(STRING_RESPONSE_CODES)),
    name: expect.any(String),
    number: expect.any(String),
    success: expect.stringMatching(unionMatcher(STRING_BOOLEAN_VALUES)),
}

const lookupHlrMatcher = (res: HLR): HLR => {
    const carrierMatcher: Carrier = {
        country: expect.any(String),
        name: expect.any(String),
        network_code: expect.any(String),
        network_type: expect.any(String),
    }

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
    }

    if ('country_code_iso3' in res) hlr.country_code_iso3 = expect.any(String)

    return hlr
}

const lookupMnpMatcher: MnpResponse = {
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
}

const lookupFormatMatcher: Format = {
    carrier: expect.any(String),
    country_code: expect.any(String),
    country_iso: expect.any(String),
    country_name: expect.any(String),
    international: expect.any(String),
    international_formatted: expect.any(String),
    national: expect.any(String),
    network_type: expect.stringMatching(unionMatcher(getStringEnumValues(NetworkType))),
    success: expect.any(Boolean),
}

const fill = <T extends { [k: string]: any }>(type: T, {numbers}: LookupParams): T[] =>
    1 === numbers.length ? [type] : Array<T>(numbers.length).fill(type)

const carrier: Carrier = {
    country: 'DE',
    name: 'Telefónica Germany GmbH & Co. oHG (O2)',
    network_code: '26203',
    network_type: NetworkType.Mobile,
}

jest.mock('../src', () => ({
    LookupResource: jest.fn().mockImplementation((): ResourceMock<LookupResource> => {
        return environment.live
            ? new LookupResource(client)
            : {
                cnam: async p => fill<CnamResponse>({
                    code: 100,
                    name: 'TELEKOM SMS',
                    number: '+4915126716517',
                    success: 'true',
                }, p),
                format: async p => fill<Format>({
                    carrier: 'O2',
                    country_code: '49',
                    country_iso: 'DE',
                    country_name: 'Germany',
                    international: '+4917666666666',
                    international_formatted: '+49 176 66666666',
                    national: '0176 66666666',
                    network_type: NetworkType.Mobile,
                    success: true,
                }, p),
                hlr: async p => fill<HLR>({
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
                }, p),
                mnp: async p => fill<MnpResponse>({
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
                }, p),
            }
    }),
}))

const resource = new LookupResource(client)

describe('Lookup related', () => {
    it('should return an array of format objects',
        async () => {
            const arr = await resource.format({numbers: ['49179999999999']})
            expect(arr.length).toEqual(1)
            arr.forEach(o => expect(o).toMatchObject(lookupFormatMatcher))
        })

    it('should return an array of mnp objects',
        async () => {
            const arr = await resource.mnp({
                numbers: [
                    '49179999999999',
                    '49171234567890',
                ],
            })
            expect(arr.length).toEqual(2)
            arr.forEach(o => expect(o).toMatchObject(lookupMnpMatcher))
        })

    it('should return an array of hlr objects',
        async () => {
            const arr = await resource.hlr({
                numbers: [
                    '49179999999999',
                    '49171234567890',
                ],
            })
            expect(arr.length).toEqual(2)
            arr.forEach(o => expect(o).toMatchObject(lookupHlrMatcher(o)))
        })

    it('should return a single cnam object',
        async () => {
            const arr = await resource.cnam({numbers: ['49179999999999']})
            expect(arr.length).toEqual(1)
            expect(arr[0]).toMatchObject(lookupCnamMatcher)
        })

    it('should return an array of cnam objects',
        async () => {
            const arr = await resource.cnam({
                numbers: [
                    '49179999999999',
                    '49171234567890',
                ],
            })
            expect(arr.length).toEqual(2)
            arr.forEach(o => expect(o).toMatchObject(lookupCnamMatcher))
        })
})
