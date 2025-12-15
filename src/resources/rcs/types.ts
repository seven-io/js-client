import type {SmsEncoding, SmsType} from '../sms/types'

export type RcsDispatchParams = {
    delay?: string
    foreign_id?: string
    from?: string
    label?: string
    performance_tracking?: boolean
    text: string
    to: string
    ttl?: number
}

export type RcsDeleteParams = {
    id: string
}

export type RcsDeleteResponse = {
    success: boolean
}

export type RcsDispatchResponse = {
    debug: 'false' | 'true'
    balance: number
    messages: RcsMessage[],
    sms_type: SmsType
    success: string
    total_price: number | null
}

export type RcsMessage = {
    channel: 'RCS' | string
    encoding: SmsEncoding
    error: string | null
    error_text: string | null
    fallback: string | null
    id: string | null
    is_binary: boolean
    label: string | null
    messages?: string[]
    parts: number
    price: number,
    recipient: string
    sender: string
    success: boolean
    text: string
    udh: string | null
}

export type RcsEvent = 'IS_TYPING' | 'READ'

export type RcsEventParamsBase = {
    event: RcsEvent
}

export type RcsEventParamsTo = {
    to: string
}

export type RcsEventParamsMessageId = {
    msg_id: string
}

export type RcsEventParams = RcsEventParamsBase & (RcsEventParamsTo | RcsEventParamsMessageId)

export type RcsEventResponse = {
    success: boolean
}