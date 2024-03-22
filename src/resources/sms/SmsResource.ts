import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import DeleteSmsPayload from './DeleteSmsPayload'
import SmsPayload from './SmsPayload'
import type {SmsDeleteParams, SmsDeleteResponse, SmsParams, SmsResponse} from './types'

export type SmsJsonParams = Omit<SmsParams, 'details' | 'json' | 'return_msg_id'>

export default class SmsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Sms
    }

    delete = async (p: SmsDeleteParams): Promise<SmsDeleteResponse> => {
        const payload = new DeleteSmsPayload(p)
        return await this.client.request('delete', this.endpoint, payload)
    }

    dispatch = async (p: SmsJsonParams): Promise<SmsResponse> => {
        const payload = new SmsPayload(p)
        return await this.client.request('post', this.endpoint, payload)
    }
}
