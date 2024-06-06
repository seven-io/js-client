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
        const payload = new ApiPayload({id}).convert()
        return await this.client.request('get', `${this.endpoint}/read`, payload)
    }

    create = async (p: SubaccountsCreateParams): Promise<SubaccountsCreateResponse> => {
        return await this.client.request('post', `${this.endpoint}/create`, new ApiPayload(p).convert())
    }

    delete = async (p: SubaccountsDeleteParams): Promise<SubaccountsDeleteResponse> => {
        return await this.client.request('post', `${this.endpoint}/delete`, new ApiPayload(p).convert())
    }

    transferCredits = async (p: SubaccountsTransferCreditsParams): Promise<SubaccountsTransferCreditsResponse> => {
        const payload = new ApiPayload(p).convert()
        return await this.client.request('post', `${this.endpoint}/transfer_credits`, payload)
    }

    autoCharge = async (p: SubaccountsAutoChargeParams): Promise<SubaccountsAutoChargeResponse> => {
        return await this.client.request('post', `${this.endpoint}/update`, new ApiPayload(p).convert())
    }
}
