import './lib/afterEachWait';
import {
    JournalInbound,
    JournalOutbound,
    JournalParams, JournalResponse,
    JournalVoice,
} from '../src/types'
import client, {env} from './lib/client';
import Sms77Client from '../src/Sms77Client';
import {journalSuccessResponse} from './data/journal';

const journal: Sms77Client['journal'] = env.live
    ? client.journal
    : jest.fn(async (p: JournalParams) => {
        let entries

        switch (p.type) {
            case 'voice':
                entries = journalSuccessResponse.voice;
                break;
            case 'inbound':
                entries = journalSuccessResponse.inbound;
                break;
            default:
                entries = journalSuccessResponse.outbound;
                break;
        }

        return entries.slice(0, p.limit || undefined)
    });

const baseMatcher = {
    from: expect.any(String),
    id: expect.any(String),
    price: expect.any(String),
    text: expect.any(String),
    timestamp: expect.any(String),
    to: expect.any(String),
};

const assertEach =
    async <J>(p: JournalParams, expected: J): Promise<void> => {
        const entries = await journal(p)
        entries.forEach(r => expect(r)
                .toMatchObject<J>(expected))
        if (p.limit && entries.length) expect(entries).toHaveLength(p.limit)
    };

const outboundMatcher = {
    ...baseMatcher,
    connection: expect.any(String),
    dlr: expect.nilOrAny(String),
    dlr_timestamp: expect.nilOrAny(String),
    foreign_id: expect.nilOrAny(String),
    label: expect.nilOrAny(String),
    latency: expect.nilOrAny(String),
    mccmnc: expect.nilOrAny(String),
    type: expect.any(String),
}

describe('Journal related', () => {
    it('should return an array of outbound objects',
        async () => (await assertEach<JournalOutbound>({type: 'outbound'}, outboundMatcher)));

    it('should return an array of inbound objects',async () =>
        (await assertEach<JournalInbound>({type: 'inbound'}, baseMatcher)));

    it('should return an array of voice objects',
        async () => (await assertEach<JournalVoice>({type: 'voice'}, {
            ...baseMatcher,
            duration: expect.any(String),
            error: expect.any(String),
            status: expect.any(String),
            xml: expect.any(Boolean),
        })));

    it('should return an array of 1 or 0 outbound objects',
        async () => (await assertEach<JournalOutbound>({
            limit: 1,
            type: 'outbound',
        }, outboundMatcher)));
});