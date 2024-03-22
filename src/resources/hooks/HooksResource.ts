import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import HooksPayload from './HooksPayload'
import {
    HooksReadResponse,
    HooksSubscribeParams,
    HooksSubscribeResponse,
    HooksUnsubscribeResponse,
} from './types'

export default class HooksResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Hooks
    }

    async read(): Promise<HooksReadResponse> {
        const payload = new HooksPayload({action: 'read'})
        const res = await this.client.request<HooksReadResponse, typeof payload>('get', this.endpoint, payload)
        if (res.hooks) {
            res.hooks = res.hooks.map((o) => {
                o.created = new Date(o.created)
                return o
            })
        }
        return res
    }

    async subscribe(p: HooksSubscribeParams): Promise<HooksSubscribeResponse> {
        const payload = new HooksPayload({
            ...p,
            action: 'subscribe',
        })
        return await this.client.request('post', this.endpoint, payload)
    }

    async unsubscribe(id: number): Promise<HooksUnsubscribeResponse> {
        const payload = new HooksPayload({
            action: 'unsubscribe',
            id,
        })
        return await this.client.request('post', this.endpoint, payload)
    }
}
