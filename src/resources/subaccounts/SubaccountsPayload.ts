import {ApiPayload} from '../../lib/ApiPayload'
import type {SubaccountsAction, SubaccountsApiParams} from './types'

export default class SubaccountsPayload<TAction extends SubaccountsAction, TData> extends ApiPayload<SubaccountsApiParams<TAction, TData>> {
    convert(): {
        [p: string]: any
    } {
        return this.params
    }
}
