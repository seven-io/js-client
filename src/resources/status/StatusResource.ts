import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import StatusPayload from './StatusPayload'
import type {StatusResponse} from './types'

export default class StatusResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Status
    }

    get = async (ids: number[]): Promise<StatusResponse[]> => {
        const payload = new StatusPayload({ids})
        const res = await this.client.request<StatusResponse[], StatusPayload>('get', this.endpoint, payload)

        console.log('res', res)

        return Array.isArray(res) ? res : [res]
    }
}
