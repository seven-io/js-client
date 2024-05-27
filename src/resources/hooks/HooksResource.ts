import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {HooksReadResponse, HooksSubscribeParams, HooksSubscribeResponse, HooksUnsubscribeResponse,} from './types'
import {ApiPayload} from '../../lib/ApiPayload'
import HooksSubscribePayload from './HooksSubscribePayload'

export default class HooksResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Hooks
    }

    async read(): Promise<HooksReadResponse> {
        const payload = new ApiPayload
        const res = await this.client.request<HooksReadResponse, typeof payload>('get', this.endpoint, payload)
        if (res.hooks) {
            res.hooks = res.hooks.map(hook => {
                hook.created = new Date(hook.created)
                return hook
            })
        }
        return res
    }

    async subscribe(p: HooksSubscribeParams): Promise<HooksSubscribeResponse> {
        const payload = new HooksSubscribePayload(p)
        return await this.client.request('post', this.endpoint, payload)
    }

    async unsubscribe(id: number): Promise<HooksUnsubscribeResponse> {
        const payload = new ApiPayload({id})
        return await this.client.request('delete', this.endpoint, payload)
    }
}
