import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {VoiceParams, VoiceResponse} from './types'
import VoicePayload from './VoicePayload'

export default class VoiceResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Voice
    }

    async dispatch(p: Omit<VoiceParams, 'json'>): Promise<VoiceResponse> {
        const payload = new VoicePayload({...p, json: true})
        return await this.client.request('post', this.endpoint, payload)
    }
}
