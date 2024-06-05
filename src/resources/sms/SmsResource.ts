import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import DeleteSmsPayload from './DeleteSmsPayload'
import SmsPayload from './SmsPayload'
import type {SmsDeleteParams, SmsDeleteResponse, SmsParams, SmsResponse} from './types'

export default class SmsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Sms
    }

    delete = async (p: SmsDeleteParams): Promise<SmsDeleteResponse> => {
        return await this.client.request('delete', this.endpoint, new DeleteSmsPayload(p))
    }

    dispatch = async (p: SmsParams): Promise<SmsResponse> => {
        return await this.client.request('post', this.endpoint, new SmsPayload(p))
    }
}
