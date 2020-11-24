import './lib/afterEachWait';
import {
    JournalInbound,
    JournalOutbound,
    JournalParams,
    JournalVoice,
} from '../src/types';
import client, {env} from './lib/client';
import Sms77Client from '../src/Sms77Client';
import {journalSuccessResponse} from './data/journal';

const journal: Sms77Client['journal'] = env.live
    ? client.journal
    : jest.fn(async (p: JournalParams) => {
        switch (p.type) {
            case 'voice':
                return journalSuccessResponse.voice;
            case 'inbound':
                return journalSuccessResponse.inbound;
            default:
                return journalSuccessResponse.outbound;
        }
    });

const baseMatcher = {
    from: expect.any(String),
    id: expect.any(String),
    price: expect.any(String),
    text: expect.any(String),
    timestamp: expect.any(String),
    to: expect.any(String),
};

const assertEact =
    async <J>(p: JournalParams, expected: J): Promise<void> => (await journal(p))
        .forEach(r => expect(r)
            .toMatchObject<J>(expected));

describe('Journal related', () => {
    it('should return an array of outbound objects',
        async () => (await assertEact<JournalOutbound>({type: 'outbound'}, {
            ...baseMatcher,
            connection: expect.any(String),
            dlr: expect.nilOrAny(String),
            dlr_timestamp: expect.nilOrAny(String),
            foreign_id: expect.nilOrAny(String),
            label: expect.nilOrAny(String),
            latency: expect.nilOrAny(String),
            mccmnc: expect.nilOrAny(String),
            type: expect.any(String),
        })));

    it('should return an array of inbound objects',async () =>
        (await assertEact<JournalInbound>({type: 'inbound'}, baseMatcher)));

    it('should return an array of voice objects',
        async () => (await assertEact<JournalVoice>({type: 'voice'}, {
            ...baseMatcher,
            duration: expect.any(String),
            error: expect.any(String),
            status: expect.any(String),
            xml: expect.any(Boolean),
        })));
});