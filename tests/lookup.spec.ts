import {ok} from 'assert'
import './lib/afterEachWait'
import {
    CNAMApiJsonResponse,
    Format,
    HLR,
    LookupCnamParams,
    LookupMnpParams,
    LookupParams,
    LookupResponse,
    MNPApiJsonResponse,
} from '../src/types'
import client from './lib/client'
import {
    lookupCnamMatcher,
    lookupFormatMatcher,
    lookupHlrMatcher,
    lookupMnpMatcher
} from './matchers/lookup'
import Sms77Client from '../src/Sms77Client'
import {
    dummyLookupCnam,
    dummyLookupFormat,
    dummyLookupHlr,
    dummyLookupMnpJson,
    dummyLookupMnpText
} from './data/lookup'
import {LookupType} from '../src/constants/byEndpoint/lookup/LookupType'

const lookup: Sms77Client['lookup'] = process.env.SMS77_LIVE_TEST
    ? client.lookup : jest.fn(async (p: LookupParams) => {
        const numbers = p.number.split(',').length
        let singular = 1 === numbers
        let type

        switch (p.type) {
            case LookupType.CallingNameDelivery:
                type = dummyLookupCnam
                break
            case LookupType.Format:
                type = dummyLookupFormat
                break
            case LookupType.HomeLocationRegister:
                type = dummyLookupHlr
                break
            case LookupType.MobileNumberPortability:

                if (p.json) type = dummyLookupMnpJson
                else {
                    singular = true // must be json to return plural
                    type = dummyLookupMnpText
                }

                break
        }

        return singular ? type : Array(numbers).fill(type)
    })

const assertResponse = async (params: Omit<LookupParams, 'number'> & { number?: string }, plural = false): Promise<LookupResponse> => {
    ok(process.env.SMS77_RECIPIENT)

    if (!params.number) params.number = plural
        ? `${process.env.SMS77_RECIPIENT},${process.env.SMS77_RECIPIENT}`
        : process.env.SMS77_RECIPIENT

    const res = await lookup(<LookupParams>params)

    expect(res).not.toBeNull()

    return res
}

describe('Lookup related', () => {
    it('should return format',
        async () => expect(await assertResponse({type: LookupType.Format}))
            .toMatchObject(lookupFormatMatcher))

    it('should return an array of format objects',
        async () => {
            const arr = <Format[]>await assertResponse({type: LookupType.Format,}, true)
            arr.forEach(o => expect(o).toMatchObject(lookupFormatMatcher))
        })

    it('should return mnp lookup as text',
        async () => {
            const res = await assertResponse({type: LookupType.MobileNumberPortability})
            expect(typeof res).toBe('string')
            expect(res).not.toHaveLength(0)
        })

    it('should return mnp lookup as json',
        async () => expect(await assertResponse(<LookupMnpParams>{
            json: true,
            type: LookupType.MobileNumberPortability
        })).toMatchObject(lookupMnpMatcher))

    it('should return an array of mnp objects',
        async () => {
            const arr = <MNPApiJsonResponse[]>await assertResponse(<LookupMnpParams>{
                json: true,
                type: LookupType.MobileNumberPortability,
            }, true)
            arr.forEach(o => expect(o).toMatchObject(lookupMnpMatcher))
        })

    it('should return a single hlr object',
        async () => {
            const res = <HLR>await assertResponse({
                type: LookupType.HomeLocationRegister,
            })
            expect(res).toMatchObject(lookupHlrMatcher(res))
        })

    it('should return an array of hlr objects',
        async () => {
            const arr = <HLR[]>await assertResponse({
                type: LookupType.HomeLocationRegister,
            }, true)
            arr.forEach(o => expect(o).toMatchObject(lookupHlrMatcher(o)))
        })

    it('should return a single cnam object',
        async () => expect(await assertResponse({
            type: 'cnam',
        } as LookupCnamParams) as CNAMApiJsonResponse)
            .toMatchObject<CNAMApiJsonResponse>(lookupCnamMatcher))

    it('should return an array of cnam objects',
        async () => {
            const arr = <CNAMApiJsonResponse[]>await assertResponse({
                type: LookupType.CallingNameDelivery,
            }, true)
            arr.forEach(o => expect(o).toMatchObject(lookupCnamMatcher))
        })
})
