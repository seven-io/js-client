import client from './lib/client'
import {getStringEnumValues, unionMatcher} from './lib/utils'
import {
    type Carrier,
    type CnamResponse,
    type Format,
    type HLR,
    HLR_PORTED_CODES,
    HLR_REACHABLE_CODES,
    HLR_ROAMING_CODES,
    HLR_STATUS_MESSAGE_CODES,
    HLR_VALID_NUMBER_CODES,
    LOOKUP_GSM_CODES,
    LookupResource,
    type MnpResponse,
    NetworkType,
    type Roaming,
    ROAMING_STATUS_CODES
} from '../src'

const cnamMatcher = (res: CnamResponse) => {
    expect(typeof res.code === 'number' || typeof res.code === 'string').toBeTruthy()
    expect(res.name === undefined || typeof res.name === 'string').toBeTruthy()
    expect(res.number === undefined || typeof res.number === 'string').toBeTruthy()
    expect(
        res.success === undefined
        || (typeof res.success === 'string' && new RegExp('false|true').test(res.success))
    ).toBeTruthy()
}

const hlrMatcher = (res: HLR): HLR => {
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

const mnpMatcher: MnpResponse = {
    code: expect.any(Number),
    mnp: {
        country: expect.any(String),
        international_formatted: expect.any(String),
        isPorted: expect.any(Boolean),
        mccmnc: expect.any(String),
        national_format: expect.any(String),
        network: expect.any(String),
        networkType: expect.any(String),
        number: expect.any(String),
    },
    price: expect.any(Number),
    success: expect.any(Boolean),
}

const formatMatcher: Format = {
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

const resource = new LookupResource(client)

describe('Lookup related', () => {
    it('should return an array of format objects', async () => {
        const arr = await resource.format({numbers: ['49179999999999']})
        expect(arr.length).toEqual(1)
        arr.forEach(o => expect(o).toMatchObject(formatMatcher))
    })

    it('should return an array of rcs capability objects', async () => {
        const arr = await resource.rcs({numbers: ['49179999999999']})
        expect(arr.length).toEqual(1)
        arr.forEach(o => {
            expect(o).toMatchObject(formatMatcher)
        })
    })

    it('should return an array of mnp objects', async () => {
        const arr = await resource.mnp({
            numbers: [
                '49179999999999',
                '49171234567890',
            ],
        })
        expect(arr.length).toEqual(2)
        arr.forEach(o => expect(o).toMatchObject(mnpMatcher))
    })

    it('should return an array of hlr objects', async () => {
        const arr = await resource.hlr({
            numbers: [
                '49179999999999',
                '49171234567890',
            ],
        })
        expect(arr.length).toEqual(2)
        arr.forEach(o => expect(o).toMatchObject(hlrMatcher(o)))
    })

    it('should return a bad cnam object', async () => {
        const arr = await resource.cnam({numbers: ['49179999999999']})
        expect(arr.length).toEqual(1)

        cnamMatcher(arr[0])
    })

    it('should return a single cnam object', async () => {
        const arr = await resource.cnam({numbers: ['491716992343']})
        expect(arr.length).toEqual(1)
        cnamMatcher(arr[0])
    })

    it('should return an array of cnam objects', async () => {
        const arr = await resource.cnam({
            numbers: [
                '49179999999999',
                '49171234567890',
            ],
        })
        expect(arr.length).toEqual(2)
        arr.forEach(cnamMatcher)
    })
})
