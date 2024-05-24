import {ApiPayload} from '../../lib/ApiPayload'
import type {SmsDeleteParams} from './types'

export default class DeleteSmsPayload extends ApiPayload<SmsDeleteParams> {
    convert(): {
        [p: string]: any
    } {
        return {
            ids: this.params.ids.join(','),
        }
    }
}
