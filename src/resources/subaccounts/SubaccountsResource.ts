import {AbstractResource} from '../AbstractResource'
import type {
    Subaccount,
    SubaccountsAutoChargeParams,
    SubaccountsAutoChargeResponse,
    SubaccountsCreateParams,
    SubaccountsCreateResponse,
    SubaccountsDeleteParams,
    SubaccountsDeleteResponse,
    SubaccountsTransferCreditsParams,
    SubaccountsTransferCreditsResponse,
} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class SubaccountsResource extends AbstractResource {
    read = async (id?: number): Promise<Subaccount[]> => {
        const payload = new ApiPayload({id}).convert()
        return await this.client.request('get', 'subaccounts/read', payload)
    }

    create = async (p: SubaccountsCreateParams): Promise<SubaccountsCreateResponse> => {
        return await this.client.request('post', 'subaccounts/create', new ApiPayload(p).convert())
    }

    delete = async (p: SubaccountsDeleteParams): Promise<SubaccountsDeleteResponse> => {
        return await this.client.request('post', 'subaccounts/delete', new ApiPayload(p).convert())
    }

    transferCredits = async (p: SubaccountsTransferCreditsParams): Promise<SubaccountsTransferCreditsResponse> => {
        return await this.client.request('post', 'subaccounts/transfer_credits', new ApiPayload(p).convert())
    }

    autoCharge = async (p: SubaccountsAutoChargeParams): Promise<SubaccountsAutoChargeResponse> => {
        return await this.client.request('post', 'subaccounts/update', new ApiPayload(p).convert())
    }
}
