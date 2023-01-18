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

export type SubaccountsReadResponse = Subaccount[]

export type SubaccountsCreateSuccessResponse = {
    error: null
    subaccount: {
        auto_topup: {
            amount: 0
            threshold: 0
        },
        balance: 0
        company: null,
        contact: {
            email: string
            name: string
        }
        id: number
        total_usage: 0,
        username: null
    }
    success: true
}

export type SubaccountsErrorResponse = {
    error: string
    success: false
}

export type SubaccountsCreateErrorResponse = SubaccountsErrorResponse

export type SubaccountsCreateResponse =
    SubaccountsCreateSuccessResponse
    | SubaccountsCreateErrorResponse

export type SubaccountsDeleteSuccessResponse = {
    error: null
    success: true
}

export type SubaccountsDeleteErrorResponse = SubaccountsErrorResponse

export type SubaccountsDeleteResponse =
    SubaccountsDeleteSuccessResponse
    | SubaccountsDeleteErrorResponse

export type SubaccountsDeleteParams = {
    id: number
}

export type SubaccountsTransferCreditsParams = {
    amount: number
    id: number
}

export type SubaccountsTransferCreditsSuccessResponse = {
    error: null
    success: true
}

export type SubaccountsTransferCreditsErrorResponse = SubaccountsErrorResponse

export type SubaccountsTransferCreditsResponse =
    SubaccountsTransferCreditsSuccessResponse
    | SubaccountsTransferCreditsErrorResponse

export type SubaccountsAutoChargeParams = {
    amount: number
    id: number
    threshold: number
}

export type SubaccountsAutoChargeSuccessResponse = {
    error: null
    success: true
}

export type SubaccountsAutoChargeErrorResponse = SubaccountsErrorResponse

export type SubaccountsAutoChargeResponse =
    SubaccountsAutoChargeSuccessResponse
    | SubaccountsAutoChargeErrorResponse

export type SubaccountsParams =
    SubaccountsCreateParams
    | SubaccountsDeleteParams
    | SubaccountsTransferCreditsParams
    | SubaccountsAutoChargeParams

export type SubaccountsResponse =
    SubaccountsAutoChargeResponse
    | SubaccountsCreateResponse
    | SubaccountsDeleteResponse
    | SubaccountsTransferCreditsResponse
    | SubaccountsReadResponse
