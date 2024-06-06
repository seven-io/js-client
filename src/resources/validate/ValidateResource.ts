import {AbstractResource} from '../AbstractResource'
import type {ValidateParams, ValidateResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class ValidateResource extends AbstractResource {
    async start(p: ValidateParams): Promise<ValidateResponse> {
        return await this.client.request('post', 'validate_for_voice', new ApiPayload(p).convert())
    }
}
