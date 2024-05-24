import {ApiPayload} from '../../lib/ApiPayload'
import {SmsJsonParams} from './SmsResource'

export default class SmsPayload extends ApiPayload<SmsJsonParams> {
    convert(): {
        [p: string]: any
    } {
        const {delay, to, ...params} = this.params
        const payload: any = {...params, json: true, to: to.join()}
        if (delay) payload.delay = delay.valueOf()
        return payload
    }
}
