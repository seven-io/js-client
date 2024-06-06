import {AbstractResource} from '../AbstractResource'
import type {
    RcsDeleteParams,
    RcsDeleteResponse,
    RcsDispatchParams,
    RcsDispatchResponse,
    RcsEventParams,
    RcsEventResponse
} from './types'
import RcsDispatchPayload from './RcsDispatchPayload'
import {ApiPayload} from '../../lib/ApiPayload'

export default class RcsResource extends AbstractResource {
    async delete(p: RcsDeleteParams): Promise<RcsDeleteResponse> {
        const payload = (new ApiPayload).convert()
        return await this.client.request('delete', `rcs/messages/${p.id}`, payload)
    }

    async dispatch(p: RcsDispatchParams): Promise<RcsDispatchResponse> {
        const payload = new RcsDispatchPayload(p).convert()
        return await this.client.request('post', 'rcs/messages', payload)
    }

    async event(p: RcsEventParams): Promise<RcsEventResponse> {
        return await this.client.request('post', 'rcs/events', new ApiPayload(p).convert())
    }
}
