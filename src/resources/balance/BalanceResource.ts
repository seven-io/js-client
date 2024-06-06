import {AbstractResource} from '../AbstractResource'
import type {Balance} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class BalanceResource extends AbstractResource {
    get = async (): Promise<Balance> => {
        return await this.client.request('get', 'balance', (new ApiPayload).convert())
    }
}
