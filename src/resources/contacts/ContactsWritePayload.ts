import ContactsPayload from './ContactsPayload'
import type {Contact} from './types'

export default class ContactsWritePayload extends ContactsPayload<Contact> {
    convert(): {
        [k: string]: any
    } {
        const {avatar, groups, properties} = this.params

        return {avatar, groups, ...properties}
    }
}
