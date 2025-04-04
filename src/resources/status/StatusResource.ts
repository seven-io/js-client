import {AbstractResource} from '../AbstractResource'
import StatusPayload from './StatusPayload'
import type {StatusResponse} from './types'

export default class StatusResource extends AbstractResource {
    get = async (ids: number[]): Promise<StatusResponse[]> => {
        const payload = new StatusPayload({ids}).convert()
        const res = await this.client.request<StatusResponse[]>('get', 'status', payload)

        console.log('res', res)

        return Array.isArray(res) ? res : [res]
    }
}
