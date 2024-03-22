import {ApiPayload} from '../../ApiPayload'
import {RcsEventParams} from './types'

export default class RcsEventPayload extends ApiPayload<RcsEventParams> {
    convert(): {
        [p: string]: any
    } {
        return this.params
    }
}
