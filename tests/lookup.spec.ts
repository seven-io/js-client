import './lib/afterEachWait';
import {
    CNAMApiJsonResponse,
    Format,
    HLR,
    LookupCnamParams,
    LookupFormatParams,
    LookupHlrParams,
    LookupMnpParams,
    LookupParams,
    LookupResponse,
    MNPApiJsonResponse,
} from '../src/types';
import client from './lib/client';
import {
    lookupCnamMatcher,
    lookupFormatMatcher,
    lookupHlrMatcher,
    lookupMnpMatcher
} from './matchers/lookup';
import Sms77Client from '../src/Sms77Client';
import {
    dummyLookupCnam, dummyLookupFormat,
    dummyLookupHlr,
    dummyLookupMnpJson,
    dummyLookupMnpText
} from './data/lookup';

const lookup: Sms77Client['lookup'] = process.env.SMS77_LIVE_TEST
    ? client.lookup : jest.fn(async (p: LookupParams) => {
        if ('format' === p.type) {
            return dummyLookupFormat
        }

        if ('cnam' === p.type) {
            return dummyLookupCnam
        }

        if ('mnp' === p.type) {
            return p.json ? dummyLookupMnpJson : dummyLookupMnpText;
        }

        return dummyLookupHlr;
    });

const assertResponse = async (params: LookupParams): Promise<LookupResponse> => {
    const res = await lookup({
        ...params,
        number: process.env.SMS77_RECIPIENT!
    });

    expect(res).not.toBeNull();

    return res;
};

describe('Lookup related', () => {
    it('should return format',
        async () => expect(await assertResponse({type: 'format'} as LookupFormatParams))
            .toMatchObject<Format>(lookupFormatMatcher));

    it('should return mnp lookup as text',
        async () => {
            const res = await assertResponse({type: 'mnp'} as LookupMnpParams);

            expect(typeof res).toBe('string');
            expect(res).not.toHaveLength(0);
        });

    it('should return mnp lookup as json',
        async () => expect(await assertResponse({
            type: 'mnp',
            json: true
        } as LookupMnpParams))
            .toMatchObject<MNPApiJsonResponse>(lookupMnpMatcher));

    it('should return hlr lookup',
        async () => {
            const res = await assertResponse({
                type: 'hlr',
            } as LookupHlrParams) as HLR;

            expect(res).toMatchObject<HLR>(lookupHlrMatcher(res));
        });

    it('should return cnam lookup',
        async () => expect(await assertResponse({
            type: 'cnam',
        } as LookupCnamParams) as CNAMApiJsonResponse)
            .toMatchObject<CNAMApiJsonResponse>(lookupCnamMatcher));
});