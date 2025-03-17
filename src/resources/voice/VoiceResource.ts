import {AbstractResource} from '../AbstractResource'
import type {VoiceParams, VoiceResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class VoiceResource extends AbstractResource {
    async dispatch(p: VoiceParams): Promise<VoiceResponse> {
        const payload = new ApiPayload(p).convert()
        payload.to  = Array.isArray(p.to) ? p.to.join(',') : p.to
        return await this.client.request('post', 'voice', payload)
    }
}
