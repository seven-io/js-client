import {ApiPayload} from '../../lib/ApiPayload'

export default class BalancePayload extends ApiPayload {
    convert(): {
        [p: string]: any
    } {
        return {}
    }
}
