export type ValidateResponse = {
    code?: string
    error: string | null
    formatted_output?: string | null
    id?: number | null
    sender?: string
    success: boolean
    voice?: boolean
}

export type ValidateParams = {
    callback?: string
    number: string
}
