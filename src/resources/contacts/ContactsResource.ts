import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import ContactsListPayload from './ContactsListPayload'
import ContactsUpsertPayload from './ContactsUpsertPayload'
import type {Contact, ContactsListParams} from './types'
import {ApiPayload} from '../../lib/ApiPayload'
import {Client} from '../../Client'

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
        const payload = new ContactsUpsertPayload(contact)
        return await this.client.request('post', this.endpoint, payload, Client.CONTENT_TYPE_URLENCODED)
    }

    async delete(id: number): Promise<void> {
        await this.client.request('delete', `${this.endpoint}/${id}`, new ApiPayload)
    }

    async get(id: number): Promise<Contact> {
        return await this.client.request('get', `${this.endpoint}/${id}`, new ApiPayload)
    }

    async list(p: ContactsListParams = {}): Promise<Contact[]> {
        return await this.client.request('get', this.endpoint, new ContactsListPayload(p))
    }

    async update(p: Contact): Promise<Contact> {
        const payload = new ContactsUpsertPayload(p)
        const endpoint = `${this.endpoint}/${p.id}`
        return await this.client.request('patch', endpoint, payload, Client.CONTENT_TYPE_URLENCODED)
    }
}
