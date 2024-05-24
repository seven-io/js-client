import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import BalancePayload from './BalancePayload'
import type {Balance} from './types'

export default class BalanceResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Balance
    }

    get = async (): Promise<Balance> => {
        const payload = new BalancePayload({})
        return await this.client.request('get', this.endpoint, payload)
    }
}
