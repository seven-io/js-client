import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import SubaccountsPayload from './SubaccountsPayload'
import type {
    Subaccount,
    SubaccountsApiParams,
    SubaccountsAutoChargeParams,
    SubaccountsAutoChargeResponse,
    SubaccountsCreateParams,
    SubaccountsCreateResponse,
    SubaccountsDeleteParams,
    SubaccountsDeleteResponse,
    SubaccountsTransferCreditsParams,
    SubaccountsTransferCreditsResponse,
} from './types'

export default class SubaccountsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Subaccounts
    }

    read = async (): Promise<Subaccount[]> => {
        const params: SubaccountsApiParams<'read', {}> = {
            action: 'read',
        }
        const payload = new SubaccountsPayload(params)
        return await this.client.request('get', this.endpoint, payload)
    }

    create = async (p: SubaccountsCreateParams): Promise<SubaccountsCreateResponse> => {
        const params: SubaccountsApiParams<'create', SubaccountsCreateParams> = {
            action: 'create',
            ...p,
        }
        const payload = new SubaccountsPayload(params)
        return await this.client.request('post', this.endpoint, payload)
    }

    delete = async (p: SubaccountsDeleteParams): Promise<SubaccountsDeleteResponse> => {
        const params: SubaccountsApiParams<'delete', SubaccountsDeleteParams> = {
            action: 'delete',
            ...p,
        }
        const payload = new SubaccountsPayload(params)
        return await this.client.request('post', this.endpoint, payload)
    }

    transferCredits = async (p: SubaccountsTransferCreditsParams): Promise<SubaccountsTransferCreditsResponse> => {
        const params: SubaccountsApiParams<'transfer_credits', SubaccountsTransferCreditsParams> = {
            action: 'transfer_credits',
            ...p,
        }
        const payload = new SubaccountsPayload(params)
        return await this.client.request('post', this.endpoint, payload)
    }

    autoCharge = async (p: SubaccountsAutoChargeParams): Promise<SubaccountsAutoChargeResponse> => {
        const params: SubaccountsApiParams<'update', SubaccountsAutoChargeParams> = {
            action: 'update',
            ...p,
        }
        const payload = new SubaccountsPayload(params)
        return await this.client.request('post', this.endpoint, payload)
    }
}
