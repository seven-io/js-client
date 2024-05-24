import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import ContactsPayload from './ContactsPayload'
import ContactsWritePayload from './ContactsWritePayload'
import type {Contact, ContactsListParams} from './types'
import emptyPayload from '../../lib/EmptyPayload'

export default class ContactsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Contacts
    }

    async create(p: Pick<Contact, 'avatar' | 'groups' | 'properties'>): Promise<Contact> {
        const contact: Contact = {
            ...p,
            created: '',
            id: 0,
            initials: {
                color: '',
                initials: ''
            },
            validation: {
                state: null,
                timestamp: null
            }
        }
        const payload = new ContactsWritePayload(contact)
        return await this.client.request('post', this.endpoint, payload, 'application/x-www-form-urlencoded')
    }

    async delete(id: number): Promise<void> {
        await this.client.request('delete', `${this.endpoint}/${id}`, emptyPayload)
    }

    async get(id: number): Promise<Contact> {
        return await this.client.request('get', `${this.endpoint}/${id}`, emptyPayload)
    }

    async list(p: ContactsListParams = {}): Promise<Contact[]> {
        return await this.client.request('get', this.endpoint, new ContactsPayload<ContactsListParams>(p))
    }

    async update(p: Contact): Promise<Contact> {
        const payload = new ContactsWritePayload(p)
        return await this.client.request('patch', `${this.endpoint}/${p.id}`, payload, 'application/x-www-form-urlencoded')
    }
}
