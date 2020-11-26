export type ValidateForVoiceResponse = {
    code?: string
    error: string | null
    formatted_output?: string | null
    id?: number | null
    sender?: string
    success: boolean
    voice?: boolean
}

export type ValidateForVoiceParams = {
    number: string
    callback?: string
}