import {AbstractResource} from '../AbstractResource'
import {
    ActiveNumber,
    ActiveNumbersResponse,
    AvailableNumbersParams,
    AvailableNumbersResponse, DeleteNumberParams, DeleteNumberResponse,
    GetNumberParams,
    OrderNumberParams,
    OrderNumberResponse, UpdateNumberParams
} from './types'

export default class NumbersResource extends AbstractResource {
    getActive = async (p: GetNumberParams): Promise<ActiveNumber> => {
        return await this.client.request('get', `numbers/active/${p.number}`, {})
    }

    listActive = async (): Promise<ActiveNumbersResponse> => {
        return await this.client.request('get', 'numbers/active', {})
    }

    listAvailable = async (p: AvailableNumbersParams): Promise<AvailableNumbersResponse> => {
        return await this.client.request('get', 'numbers/available', p)
    }

    order = async (p: OrderNumberParams): Promise<OrderNumberResponse> => {
        if (typeof p.number === 'object') p.number = p.number.number
        return await this.client.request('post', 'numbers/order', p)
    }

    update = async ({number, ...p}: UpdateNumberParams): Promise<ActiveNumber> => {
        const phone =  typeof number === 'object' ? number.number : number
        return await this.client.request('patch', `numbers/active/${phone}`, p)
    }

    delete = async ({number, ...p}: DeleteNumberParams): Promise<DeleteNumberResponse> => {
        const phone =  typeof number === 'object' ? number.number : number
        return await this.client.request('delete', `numbers/active/${phone}`, p)
    }
}
