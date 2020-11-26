export type VoiceResponseJson = {
    code: number
    cost: number
    id: number
}

export type VoiceResponse = string | VoiceResponseJson

export type VoiceParams = {
    _json?: boolean
    text: string
    to: string
    xml?: boolean
    from?: string
}