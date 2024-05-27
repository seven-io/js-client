import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {ValidateParams, ValidateResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class ValidateResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.ValidateForVoice
    }

    async start(p: ValidateParams): Promise<ValidateResponse> {
        return await this.client.request('post', this.endpoint, new ApiPayload(p))
    }
}
