import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {ValidateParams, ValidateResponse} from './types'
import ValidationPayload from './ValidationPayload'

export default class ValidateResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.ValidateForVoice
    }

    async start(p: ValidateParams): Promise<ValidateResponse> {
        const payload = new ValidationPayload(p)
        return await this.client.request('post', this.endpoint, payload)
    }
}
