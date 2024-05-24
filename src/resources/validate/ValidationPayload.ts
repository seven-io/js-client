import {ApiPayload} from '../../lib/ApiPayload'
import {ValidateParams} from './types'

export default class ValidationPayload extends ApiPayload<ValidateParams> {
    convert(): {
        [p: string]: any
    } {
        return this.params
    }
}
