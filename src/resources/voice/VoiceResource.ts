import {AbstractResource} from '../AbstractResource'
import type {VoiceParams, VoiceResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class VoiceResource extends AbstractResource {
    async dispatch(p: VoiceParams): Promise<VoiceResponse> {
        return await this.client.request('post', 'voice', new ApiPayload(p).convert())
    }
}
