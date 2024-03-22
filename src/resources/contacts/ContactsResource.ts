import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import {ContactsAction} from './ContactsAction'
import ContactsPayload from './ContactsPayload'
import ContactsWritePayload from './ContactsWritePayload'
import {Contact, ContactDeleteResponse, ContactWriteParams, ContactWriteResponse} from './types'

export default class ContactsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Contacts
    }

    async delete(id: number): Promise<ContactDeleteResponse> {
        const payload = new ContactsPayload({action: ContactsAction.Delete, id})
        return await this.client.request('post', this.endpoint, payload)
    }

    async read(): Promise<Contact[]> {
        const payload = new ContactsPayload({action: ContactsAction.Read})
        return await this.client.request('get', this.endpoint, payload)
    }

    async write(p: ContactWriteParams): Promise<ContactWriteResponse> {
        const payload = new ContactsWritePayload({...p, action: ContactsAction.Write})
        return await this.client.request('get', this.endpoint, payload)
    }
}
