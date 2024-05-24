import {ApiPayload} from '../../lib/ApiPayload'

export default class JournalPayload<T extends {}> extends ApiPayload<T> {
    convert(): {
        [p: string]: any
    } {
        return {}
    }
}
