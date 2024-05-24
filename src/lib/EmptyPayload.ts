import {ApiPayload} from './ApiPayload'

class EmptyPayload extends ApiPayload {
    convert(): { [p: string]: any } {
        return {}
    }
}

export default new EmptyPayload({})