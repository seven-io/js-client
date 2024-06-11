import {ApiPayload} from '../../lib/ApiPayload'
import type {SmsParams} from './types'

export default class SmsPayload extends ApiPayload<SmsParams> {
    convert(): {
        [p: string]: any
    } {
        const {delay, to, ...params} = this.params

        return {
            ...params,
            delay: delay ? delay.valueOf() : undefined,
            to: to.join(',')
        }
    }
}
