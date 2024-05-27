import {Endpoint} from '../../lib'
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
    get endpoint(): Endpoint {
        return Endpoint.Subaccounts
    }

    read = async (id?: number): Promise<Subaccount[]> => {
        return await this.client.request('get', `${this.endpoint}/read`, new ApiPayload({id}))
    }

    create = async (p: SubaccountsCreateParams): Promise<SubaccountsCreateResponse> => {
        return await this.client.request('post', `${this.endpoint}/create`, new ApiPayload(p))
    }

    delete = async (p: SubaccountsDeleteParams): Promise<SubaccountsDeleteResponse> => {
        return await this.client.request('post', `${this.endpoint}/delete`, new ApiPayload(p))
    }

    transferCredits = async (p: SubaccountsTransferCreditsParams): Promise<SubaccountsTransferCreditsResponse> => {
        return await this.client.request('post', `${this.endpoint}/transfer_credits`, new ApiPayload(p))
    }

    autoCharge = async (p: SubaccountsAutoChargeParams): Promise<SubaccountsAutoChargeResponse> => {
        return await this.client.request('post', `${this.endpoint}/update`, new ApiPayload(p))
    }
}
