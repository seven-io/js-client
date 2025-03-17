export type VoiceMessage = {
    error: string | null
    error_text: string | null
    id: string | null
    price: number,
    recipient: string
    sender: string
    success: boolean
    text: string
}

export type VoiceResponse = {
    balance: number
    debug: boolean
    messages: VoiceMessage[],
    success: string
    total_price: number
}

export type VoiceParams = {
    from?: string
    ringtime?: number
    text: string
    to: string|string[]
}
