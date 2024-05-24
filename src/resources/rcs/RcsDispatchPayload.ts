import {ApiPayload} from '../../lib/ApiPayload'
import {RcsDispatchParams} from './types'

export default class RcsDispatchPayload extends ApiPayload<RcsDispatchParams> {
    convert(): {
        [p: string]: any
    } {
        const {delay, ...params} = this.params
        const payload: { [k: string]: any } = params
        if (delay) payload.delay = delay.valueOf()
        return payload
    }
}
