export type JournalParams = {
    dateFrom?: string
    dateTo?: string
    id?: number
    limit?: number
    offset?: number
    state?: string
    to?: string
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

export type JournalInbound = JournalBase & {
    reply_to_message_id: string|null
}
