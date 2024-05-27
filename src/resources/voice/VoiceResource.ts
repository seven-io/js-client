import {Endpoint} from '~/lib'
import {AbstractResource} from '../AbstractResource'
import type {VoiceParams, VoiceResponse} from './types'
import {ApiPayload} from '~/lib/ApiPayload'

export default class VoiceResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Voice
    }

    async dispatch(p: VoiceParams): Promise<VoiceResponse> {
        return await this.client.request('post', this.endpoint, new ApiPayload(p))
    }
}
