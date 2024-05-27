import {ApiPayload} from '../../lib/ApiPayload'
import type {RcsDispatchParams} from './types'

export default class RcsDispatchPayload extends ApiPayload<RcsDispatchParams> {
    convert(): {
        [p: string]: any
    } {
        const {delay, ...params} = this.params

        return {
            ...params,
            delay: delay ? delay.valueOf() : undefined
        }
    }
}
