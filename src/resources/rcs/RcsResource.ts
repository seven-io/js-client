import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {
    RcsDeleteParams,
    RcsDeleteResponse,
    RcsDispatchParams,
    RcsDispatchResponse,
    RcsEventParams,
    RcsEventResponse
} from './types'
import emptyPayload from '../../lib/EmptyPayload'
import RcsDispatchPayload from './RcsDispatchPayload'
import RcsEventPayload from './RcsEventPayload'

export default class RcsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.RCS
    }

    async delete(p: RcsDeleteParams): Promise<RcsDeleteResponse> {
        return await this.client.request('delete', `${this.endpoint}/messages/${p.id}`, emptyPayload)
    }

    async dispatch(p: RcsDispatchParams): Promise<RcsDispatchResponse> {
        const payload = new RcsDispatchPayload(p)
        return await this.client.request('post', `${this.endpoint}/messages`, payload)
    }

    async event(p: RcsEventParams): Promise<RcsEventResponse> {
        return await this.client.request('post', `${this.endpoint}/events`, new RcsEventPayload(p))
    }
}
