import {AbstractResource} from '../AbstractResource'
import type {HooksReadResponse, HooksSubscribeParams, HooksSubscribeResponse, HooksUnsubscribeResponse,} from './types'
import {ApiPayload} from '../../lib/ApiPayload'
import HooksSubscribePayload from './HooksSubscribePayload'

export default class HooksResource extends AbstractResource {
    async read(): Promise<HooksReadResponse> {
        const payload = (new ApiPayload).convert()
        const res = await this.client.request<HooksReadResponse, typeof payload>('get', 'hooks', payload)
        if (res.hooks) {
            res.hooks = res.hooks.map(hook => {
                hook.created = new Date(hook.created)
                return hook
            })
        }
        return res
    }

    async subscribe(p: HooksSubscribeParams): Promise<HooksSubscribeResponse> {
        return await this.client.request('post', 'hooks', new HooksSubscribePayload(p).convert())
    }

    async unsubscribe(id: number): Promise<HooksUnsubscribeResponse> {
        return await this.client.request('delete', 'hooks', new ApiPayload({id}).convert())
    }
}
