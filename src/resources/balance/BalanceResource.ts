import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {Balance} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class BalanceResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Balance
    }

    get = async (): Promise<Balance> => {
        return await this.client.request('get', this.endpoint, (new ApiPayload).convert())
    }
}
