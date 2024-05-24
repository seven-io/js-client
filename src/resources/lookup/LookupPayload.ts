import {ApiPayload} from '../../lib/ApiPayload'

export default class LookupPayload<T extends {}> extends ApiPayload<{
    numbers: string[],
} & T> {
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
