import type {Contact} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class ContactsUpsertPayload extends ApiPayload<Contact> {
    convert(): {
        [k: string]: any
    } {
        const {avatar, groups, properties} = this.params

        return {avatar, groups, ...properties}
    }
}
