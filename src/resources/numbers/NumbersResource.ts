import {AbstractResource} from '../AbstractResource'
import {
    ActiveNumbersResponse,
    AvailableNumbersParams,
    AvailableNumbersResponse, DeleteNumberParams, DeleteNumberResponse,
    GetNumberParams,
    OrderNumberParams,
    OrderNumberResponse, UpdateNumberParams
} from './types'

export default class NumbersResource extends AbstractResource {
    getActive = async (p: GetNumberParams): Promise<Number> => {
        return await this.client.request('get', `numbers/active/${p.number}`, {})
    }

    listActive = async (): Promise<ActiveNumbersResponse> => {
        return await this.client.request('get', 'numbers/active', {})
    }

    listAvailable = async (p: AvailableNumbersParams): Promise<AvailableNumbersResponse> => {
        return await this.client.request('get', 'numbers/available', p)
    }

    order = async (p: OrderNumberParams): Promise<OrderNumberResponse> => {
        return await this.client.request('post', 'numbers/order', p)
    }

    update = async ({number, ...p}: UpdateNumberParams): Promise<Number> => {
        return await this.client.request('patch', `numbers/active/${number}`, p)
    }

    delete = async ({number, ...p}: DeleteNumberParams): Promise<DeleteNumberResponse> => {
        return await this.client.request('delete', `numbers/active/${number}`, p)
    }
}
