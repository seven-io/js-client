import {ApiPayload} from '../../ApiPayload'

export default class LookupPayload<T extends {}> extends ApiPayload<{
    numbers: string[],
    type: 'cnam' | 'format' | 'hlr' | 'mnp'
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
