import {ApiPayload} from '../../lib/ApiPayload'
import type {HooksSubscribeParams} from './types'

export default class HooksSubscribePayload extends ApiPayload<HooksSubscribeParams> {
    convert(): {
        [p: string]: any
    } {
        const {eventFilter, eventType, requestMethod, targetUrl, ...params} = this.params

        return {
            ...params,
            request_method: requestMethod,
            event_filter: eventFilter,
            event_type: eventType,
            target_url: targetUrl,
        }
    }
}
