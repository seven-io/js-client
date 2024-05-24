import {ApiPayload} from '../../lib/ApiPayload'
import type {PricingParams} from './types'

export default class PricingPayload<T extends {}> extends ApiPayload<PricingParams & T> {
    convert(): {
        [p: string]: any
    } {
        return this.params
    }
}
