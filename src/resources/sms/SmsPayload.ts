import {ApiPayload} from '../../lib/ApiPayload'
import type {SmsParams} from './types'

export default class SmsPayload extends ApiPayload<SmsParams> {
    convert(): {
        [p: string]: any
    } {
        const {delay, to, ...params} = this.params
        const payload: any = {...params, json: true, to: to.join()}
        if (delay) payload.delay = delay.valueOf()
        return payload
    }
}
