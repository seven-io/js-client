import {ApiPayload} from '../../lib/ApiPayload'
import {LookupParams} from './types'

export default class LookupPayload extends ApiPayload<LookupParams> {
    convert(): {
        [p: string]: any
    } {
        const {numbers, ...params} = this.params

        return {
            ...params,
            number: this.params.numbers.join(','),
        }
    }
}
