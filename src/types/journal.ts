import {JOURNAL_TYPES} from '../constants/byEndpoint/journal';

export type JournalType = (typeof JOURNAL_TYPES)[number]

export type JournalParams = {
    date_from?: string
    date_to?: string
    id?: number
    limit?: number
    state?: string
    to?: string
    type: JournalType
}

export type JournalBase = {
    from: string
    id: string
    price: string
    text: string
    timestamp: string
    to: string
}

export type JournalOutbound = JournalBase & {
    connection: string
    dlr: string | null
    dlr_timestamp: string | null
    foreign_id: string | null
    label: string | null
    latency: string | null
    mccmnc: string | null
    type: string
}

export type JournalVoice = JournalBase & {
    duration: string
    error: string
    status: 'completed' | 'no-answer' | string
    xml: boolean
}

export type JournalInbound = JournalBase

export type Journal = JournalOutbound | JournalInbound | JournalVoice

export type JournalResponse = Journal[]