import {ApiPayload} from '../../lib/ApiPayload'
import type {VoiceParams} from './types'

export default class VoicePayload extends ApiPayload<VoiceParams & {
    json?: boolean
}> {
    convert(): {
        [p: string]: any
    } {
        return this.params
    }
}
