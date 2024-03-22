import {
    JournalBase,
    JournalInbound,
    JournalOutbound,
    JournalParams,
    JournalResource,
    JournalVoice,
} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

const journalSuccessResponse = {
    inbound: [
        {
            from: 'SMS',
            id: '681590',
            price: '1.0000',
            text: 'keyword hi im tanja tester',
            timestamp: '2020-11-20 14:15:04',
            to: '4917601234567890',
        },
    ],
    outbound: [
        {
            connection: 'http',
            dlr: null,
            dlr_timestamp: null,
            foreign_id: null,
            from: '',
            id: '77130682488',
            label: null,
            latency: null,
            mccmnc: null,
            price: '0.0750',
            text: 'Urgent: Server down - ECONNREFUSED (code: null)',
            timestamp: '2020-10-26 08:26:04.979',
            to: '4917601234567890',
            type: 'direct',
        },
    ],
    replies: [
        {
            from: 'SMS',
            id: '681590',
            price: '1.0000',
            text: 'keyword hi im tanja tester',
            timestamp: '2020-11-20 14:15:04',
            to: '4917601234567890',
        },
    ],
    voice: [
        {
            duration: '5',
            error: '',
            from: '491771783130',
            id: '178911',
            price: '0.075',
            status: 'completed',
            text: '1604513383',
            timestamp: '2020-11-04 19:09:43',
            to: '4917601234567890',
            xml: false,
        },
        {
            duration: '0',
            error: '',
            from: '491771783130',
            id: '178518',
            price: '0',
            status: 'failed',
            text: '<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="woman" language="de-DE">Hey there<\/Say><Record maxLength="20"\/><\/Response>',
            timestamp: '2020-11-02 08:58:45',
            to: '4917601234567890',
            xml: true,
        },
    ],
}


const limit = <T extends JournalBase>(entries: JournalBase[], p: JournalParams = {}): T[] =>
    entries.slice(0, p.limit || undefined) as T[]

jest.mock('../src', () => ({
    JournalResource: jest.fn().mockImplementation((): ResourceMock<JournalResource> => {
        return environment.live
            ? new JournalResource(client)
            : {
                inbound: async (p) => limit(journalSuccessResponse.inbound, p),
                outbound: async (p) => limit(journalSuccessResponse.outbound, p),
                replies: async (p) => limit(journalSuccessResponse.replies, p),
                voice: async (p) => limit(journalSuccessResponse.voice, p),
            }
    }),
}))

const resource = new JournalResource(client)

const baseMatcher = {
    from: expect.any(String),
    id: expect.any(String),
    price: expect.any(String),
    text: expect.any(String),
    timestamp: expect.any(String),
    to: expect.any(String),
}

const assertEach = <J extends JournalBase>(entries: JournalBase[], p: JournalParams, expected: J): void => {
    entries.forEach(r => expect(r).toMatchObject<J>(expected))
    if (p.limit && entries.length) expect(entries).toHaveLength(p.limit)
}

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
    it('should return an array of outbound objects', async () => {
        const entries = await resource.outbound({})
        assertEach<JournalOutbound>(entries, {}, outboundMatcher)
    })

    it('should return an array of inbound objects', async () => {
        const entries = await resource.inbound({})
        assertEach<JournalInbound>(entries, {}, baseMatcher)
    })

    it('should return an array of voice objects', async () => {
        const entries = await resource.voice({})

        assertEach<JournalVoice>(entries, {}, {
            ...baseMatcher,
            duration: expect.any(String),
            error: expect.any(String),
            status: expect.any(String),
            xml: expect.any(Boolean),
        })
    })

    it('should return an array of 1 or 0 outbound objects', async () => {
        const entries = await resource.outbound({})

        assertEach<JournalOutbound>(entries, {
            limit: 1,
        }, outboundMatcher)
    })
})
