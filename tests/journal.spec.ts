import client from './lib/client'
import {JournalResource} from '../src/resources'
import type {
    JournalBase,
    JournalInbound,
    JournalOutbound,
    JournalParams,
    JournalVoice
} from '../src/resources/journal/types'

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

const outboundMatcher: JournalOutbound = {
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
