// noinspection JSUnusedGlobalSymbols

export type Profile = {
    alias: string
    balance: string
    company: string
    email: string
    success: boolean
    user_id: number
}

export type OauthScope = 'analytics' | 'balance' | 'contacts' | 'hooks' | 'journal' | 'lookup' | 'pricing' | 'sms'
    | 'status' | 'subaccounts' | 'validate_for_voice' | 'voice'

export type TokenResponse = {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: OauthScope[]
    token_type: 'Bearer'
}