import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import ContactsListPayload from './ContactsListPayload'
import ContactsUpsertPayload from './ContactsUpsertPayload'
import type {Contact, ContactsCreateParams, ContactsDeleteResponse, ContactsListParams} from './types'
import {ApiPayload} from '../../lib/ApiPayload'
import {Client} from '../../Client'

export default class ContactsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Contacts
    }

    async create({avatar, groups, properties}: ContactsCreateParams): Promise<Contact> {
        const contact: Contact = {
            avatar,
            created: '',
            groups,
            id: 0,
            initials: {
                color: '',
                initials: ''
            },
            properties: {
                ...properties,
                fullname: '',
            } as Contact['properties'],
            validation: {
                state: null,
                timestamp: null
            }
        }
        const payload = new ContactsUpsertPayload(contact).convert()
        return await this.client.request('post', this.endpoint, payload, Client.CONTENT_TYPE_URLENCODED)
    }

    async delete(id: number): Promise<ContactsDeleteResponse> {
        return await this.client.request('delete', `${this.endpoint}/${id}`, (new ApiPayload).convert())
    }

    async get(id: number): Promise<Contact> {
        return await this.client.request('get', `${this.endpoint}/${id}`, (new ApiPayload).convert())
    }

    async list(p: ContactsListParams = {}): Promise<Contact[]> {
        return await this.client.request('get', this.endpoint, new ContactsListPayload(p).convert())
    }

    async update(p: Contact): Promise<Contact> {
        const payload = new ContactsUpsertPayload(p).convert()
        const endpoint = `${this.endpoint}/${p.id}`
        return await this.client.request('patch', endpoint, payload, Client.CONTENT_TYPE_URLENCODED)
    }
}
