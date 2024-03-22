export type Subaccount = {
    auto_topup: {
        amount: number
        threshold: number
    }
    balance: number
    company: null | string
    contact: {
        email: string
        name: string
    }
    id: number
    total_usage: number
    username: null | string
}

export type SubaccountsAction = 'read' | 'create' | 'delete' | 'update' | 'transfer_credits'

export type SubaccountsApiParams<TAction extends SubaccountsAction, TData> = {
    action: TAction
} & TData

export type SubaccountsCreateParams = {
    email: string
    name: string
}

export type SubaccountsCreateResponse = {
    error: string | null
    subaccount?: Subaccount
    success: boolean
}

export type SubaccountsDeleteResponse = {
    error: string | null
    success: boolean
}

export type SubaccountsDeleteParams = {
    id: number
}

export type SubaccountsTransferCreditsParams = {
    amount: number
    id: number
}

export type SubaccountsTransferCreditsResponse = {
    error: string | null
    success: boolean
}

export type SubaccountsAutoChargeParams = {
    amount: number
    id: number
    threshold: number
}

export type SubaccountsAutoChargeResponse = {
    error: string | null
    success: boolean
}
