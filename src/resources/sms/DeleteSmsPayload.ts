import {ApiPayload} from '../../lib/ApiPayload'
import {SmsDeleteParams} from './types'

export default class DeleteSmsPayload extends ApiPayload<SmsDeleteParams> {
    convert(): {
        [p: string]: any
    } {
        return {
            ids: this.params.ids.join(','),
        }
    }
}
