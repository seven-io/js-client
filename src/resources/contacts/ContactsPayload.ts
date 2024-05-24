import {ApiPayload} from '../../lib/ApiPayload'

export default class ContactsPayload<T extends {}> extends ApiPayload<T> {
    convert(): {
        [k: string]: any
    } {
        return this.params
    }
}
