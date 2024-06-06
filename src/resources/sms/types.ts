import {SMS_ENCODINGS, SMS_TYPES} from './constants'

export type SmsDeleteParams = {
    ids: string[]
}

export type SmsDeleteResponse = {
    deleted: string[] | null
    success: boolean
}

export type SmsEncoding = typeof SMS_ENCODINGS[number]

export type SmsFile = {
    contents: string
    name: string
    password?: string
    validity?: number
}

export type SmsMessage = {
    encoding: SmsEncoding
    error: string | null
    error_text: string | null
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

export type SmsType = typeof SMS_TYPES[number]

export type SmsParams = {
    delay?: Date
    files?: SmsFile[]
    flash?: boolean
    foreign_id?: string
    from?: string
    label?: string
    performance_tracking?: boolean
    text: string
    to: string[]
    udh?: string
    ttl?: number
}

export type SmsResponse = {
    debug: 'false' | 'true'
    balance: number
    messages: SmsMessage[],
    sms_type: SmsType
    success: string
    total_price: number
}
