import {ApiPayload} from '../../lib/ApiPayload'
import type {RcsEventParams} from './types'

export default class RcsEventPayload extends ApiPayload<RcsEventParams> {
    convert(): {
        [p: string]: any
    } {
        return this.params
    }
}
