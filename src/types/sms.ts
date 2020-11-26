import {
    SMS_DEBUG_VALUES,
    SMS_ENCODINGS,
    SMS_SIGNATURE_POSITIONS,
    SMS_TYPES
} from '../constants/byEndpoint/sms';

export type SmsResponse = number | string | SmsJsonResponse

export type AddSignatureOpts = {
    position: typeof SMS_SIGNATURE_POSITIONS[number]
    signature: string
    text: string
}

export type SmsMessage = {
    encoding: typeof SMS_ENCODINGS[number]
    error: string | null
    error_text: string | null
    id: string | null
    messages?: string[]
    parts: number
    price: number,
    recipient: string
    sender: string
    success: boolean
    text: string
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