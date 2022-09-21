import {
    SMS_DEBUG_VALUES,
    SMS_ENCODINGS,
    SMS_SIGNATURE_POSITIONS,
    SMS_TYPES
} from '../constants/byEndpoint/sms';

export type AddSignatureOpts = {
    position: typeof SMS_SIGNATURE_POSITIONS[number]
    signature: string
    text: string
}

export type SmsResponse = number | string | SmsJsonResponse

export type SmsDeleteParams = {
    ids: string[]
}

export type SmsDeleteResponse = {
    deleted: string[]
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
    udh: string| null
}

export type SmsType = typeof SMS_TYPES[number]

export type SmsParams = {
    _extras?: {
        signature?: string
        signaturePosition?: AddSignatureOpts['position']
    }
    debug?: boolean
    delay?: string
    details?: boolean
    files?: SmsFile[]
    flash?: boolean
    foreign_id?: string
    from?: string
    label?: string
    json?: boolean
    no_reload?: boolean
    text: string
    to: string
    unicode?: boolean
    udh?: string
    utf8?: boolean
    ttl?: number
    performance_tracking?: boolean
    return_msg_id?: boolean
}

export type SmsJsonResponse = {
    debug: typeof SMS_DEBUG_VALUES[number]
    balance: number
    messages: SmsMessage[],
    sms_type: SmsType
    success: string
    total_price: number
}
