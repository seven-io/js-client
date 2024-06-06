import {AbstractResource} from '../AbstractResource'
import DeleteSmsPayload from './DeleteSmsPayload'
import SmsPayload from './SmsPayload'
import type {SmsDeleteParams, SmsDeleteResponse, SmsParams, SmsResponse} from './types'

export default class SmsResource extends AbstractResource {
    delete = async (p: SmsDeleteParams): Promise<SmsDeleteResponse> => {
        return await this.client.request('delete', 'sms', new DeleteSmsPayload(p).convert())
    }

    dispatch = async (p: SmsParams): Promise<SmsResponse> => {
        return await this.client.request('post', 'sms', new SmsPayload(p).convert())
    }
}
