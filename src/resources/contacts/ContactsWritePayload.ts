import ContactsPayload from './ContactsPayload'
import {ContactWriteParams} from './types'

export default class ContactsWritePayload extends ContactsPayload<ContactWriteParams> {
    convert(): {
        [k: string]: any
    } {
        const {mobile, ...params} = this.params

        return {empfaenger: mobile, ...params}
    }
}
