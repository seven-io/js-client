import {BaseClient} from '../BaseClient'
import {Endpoint} from '../constants/Endpoint'
import {
    Subaccount,
    SubaccountsAction,
    SubaccountsApiParams,
    SubaccountsAutoChargeParams,
    SubaccountsAutoChargeResponse,
    SubaccountsCreateParams,
    SubaccountsCreateResponse,
    SubaccountsDeleteParams,
    SubaccountsDeleteResponse,
    SubaccountsResponse,
    SubaccountsTransferCreditsParams,
    SubaccountsTransferCreditsResponse,
} from '../types'

export default class SubaccountsResource {
    constructor(protected readonly client: BaseClient) {
    }

    _dynamic = async <TAction extends SubaccountsAction, TData, TRes extends SubaccountsResponse>(
        p: SubaccountsApiParams<TAction, TData>,
    ): Promise<TRes> => {
        switch (p.action) {
            case 'read':
                return await this.read() as TRes
            case 'create':
                return await this.create(p as unknown as SubaccountsCreateParams) as TRes
            case 'delete':
                return await this.delete(p as unknown as SubaccountsDeleteParams) as TRes
            case 'update':
                return await this.autoCharge(p as unknown as SubaccountsAutoChargeParams) as TRes
            case 'transfer_credits':
                return await this.transferCredits(p as unknown as SubaccountsTransferCreditsParams) as TRes
        }

        throw new Error(`Invalid action ${p.action}`)
    }

    read = async (): Promise<Subaccount[]> => {
        const params: SubaccountsApiParams<'read', {}> = {
            action: 'read',
        }
        return await this.client.get(Endpoint.Subaccounts, params) as Subaccount[]
    }

    create = async (p: SubaccountsCreateParams): Promise<SubaccountsCreateResponse> => {
        const params: SubaccountsApiParams<'create', SubaccountsCreateParams> = {
            action: 'create',
            ...p,
        }
        return await this.client.post(Endpoint.Subaccounts, params) as SubaccountsCreateResponse
    }

    delete = async (p: SubaccountsDeleteParams): Promise<SubaccountsDeleteResponse> => {
        const params: SubaccountsApiParams<'delete', SubaccountsDeleteParams> = {
            action: 'delete',
            ...p,
        }
        return await this.client.post(Endpoint.Subaccounts, params) as SubaccountsDeleteResponse
    }

    transferCredits = async (p: SubaccountsTransferCreditsParams): Promise<SubaccountsTransferCreditsResponse> => {
        const params: SubaccountsApiParams<'transfer_credits', SubaccountsTransferCreditsParams> = {
            action: 'transfer_credits',
            ...p,
        }
        return await this.client.post(Endpoint.Subaccounts, params) as SubaccountsTransferCreditsResponse
    }

    autoCharge = async (p: SubaccountsAutoChargeParams): Promise<SubaccountsAutoChargeResponse> => {
        const params: SubaccountsApiParams<'update', SubaccountsAutoChargeParams> = {
            action: 'update',
            ...p,
        }
        return await this.client.post(Endpoint.Subaccounts, params) as SubaccountsAutoChargeResponse
    }
}
