import type {Contact} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class ContactsUpsertPayload extends ApiPayload<Contact> {
    convert(): {
        [k: string]: any
    } {
        const {avatar, groups, properties} = this.params
        const {fullname, ...remainingProperties} = properties
        const cleanProperties: { [k: string]: any } = {}
        Object.entries(remainingProperties).forEach(([k, v]) => {
            if (v === null) return
            cleanProperties[k] = v
        })

        return {avatar, groups, ...cleanProperties}
    }
}
