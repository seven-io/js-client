import {ApiPayload} from '../../lib/ApiPayload'
import {ContactsAction} from './ContactsAction'

export default class ContactsPayload<T extends {}> extends ApiPayload<{
    action: ContactsAction
} & T> {
    convert(): {
        [k: string]: any
    } {
        return {...this.params, json: true}
    }
}
