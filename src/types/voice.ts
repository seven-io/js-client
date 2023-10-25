export type VoiceJsonMessage = {
    error: string | null
    error_text: string | null
    id: string | null
    price: number,
    recipient: string
    sender: string
    success: boolean
    text: string
}

export type VoiceJsonResponse = {
    debug: boolean
    balance: number
    messages: VoiceJsonMessage[],
    success: string
    total_price: number
}

export type VoiceResponse = string | VoiceJsonResponse

export type VoiceParams = {
    debug?: boolean
    json?: boolean
    ringtime?: number
    text: string
    to: string
    xml?: boolean
    from?: string
}
