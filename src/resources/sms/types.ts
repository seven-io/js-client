import STRING_BOOLEAN_VALUES from '../../lib/StringBooleanValues'
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
    debug?: boolean
    delay?: Date
    details?: boolean
    files?: SmsFile[]
    flash?: boolean
    foreign_id?: string
    from?: string
    label?: string
    json?: boolean
    no_reload?: boolean
    performance_tracking?: boolean
    return_msg_id?: boolean
    text: string
    to: string[]
    unicode?: boolean
    udh?: string
    utf8?: boolean
    ttl?: number
}

export type SmsResponse = {
    debug: typeof STRING_BOOLEAN_VALUES[number]
    balance: number
    messages: SmsMessage[],
    sms_type: SmsType
    success: string
    total_price: number
}
