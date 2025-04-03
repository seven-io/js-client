export type AvailableNumbersParams = {
    country?: string
    features_a2p_sms?: boolean
    features_sms?: boolean
    features_voice?: boolean
}

export type PaymentInterval = 'annually' | 'monthly'

export type OrderNumberResponse = {
    error: string|null
    success: boolean
}

export type ActiveNumbersResponse = {
    activeNumbers: ActiveNumber[]
}

export type AvailableNumber = {
    country: string
    features: {
        a2p_sms: boolean
        sms: boolean
        voice: boolean
    }
    fees: {
        monthly: {
            basic_charge: number
            setup: number
        },
        annually: {
            basic_charge: number
            setup: number
        },
        sms_mo: number
        voice_mo: number
    }
    number: string
    number_parsed: string
}

export type AvailableNumbersResponse = {
    availableNumbers: AvailableNumber[]
}

export type OrderNumberParams = {
    number: string|AvailableNumber
    payment_interval?: PaymentInterval
}

export type UpdateNumberParams = {
    email_forward?: string[]
    friendly_name?: string
    number: string|ActiveNumber
    sms_forward?: string[]
}

export type DeleteNumberResponse = {
    success: boolean
}

export type DeleteNumberParams = {
    delete_immediately?: boolean
    number: string|ActiveNumber
}

export type GetNumberParams = {
    number: string
}

export type ActiveNumber = {
    billing: {
        fees: {
            basic_charge: number
            setup: number
            sms_mo: number
            voice_mo: number
        },
        payment_interval: PaymentInterval
    },
    country: string
    created: string
    expires: string|null
    features: {
        a2p_sms:boolean
        sms: boolean
        voice: boolean
    },
    forward_sms_mo: {
        email: {
            address: string[]
            enabled: boolean
        }
        sms: {
            enabled: boolean
            number: string[]
        }
    },
    friendly_name: string
    number: string
}