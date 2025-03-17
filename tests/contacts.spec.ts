import client from './lib/client'
import {type Contact, type ContactsCreateParams, ContactsResource} from '../src'

const resource = new ContactsResource(client)
const contactMatcher: Contact = {
    avatar: expect.nilOrAny(String),
    created: expect.any(String),
    groups: expect.any(Array),
    id: expect.any(Number),
    initials: {
        color: expect.any(String),
        initials: expect.any(String),
    },
    properties: {
        address: expect.nilOrAny(String),
        birthday: expect.nilOrAny(String),
        city: expect.nilOrAny(String),
        email: expect.nilOrAny(String),
        firstname: expect.nilOrAny(String),
        fullname: expect.nilOrAny(String),
        home_number: expect.nilOrAny(String),
        lastname: expect.nilOrAny(String),
        mobile_number: expect.nilOrAny(String),
        notes: expect.nilOrAny(String),
        postal_code: expect.nilOrAny(String),
    },
    validation: {
        state: expect.nilOrAny(String),
        timestamp: expect.nilOrAny(String)
    },
}

describe('Contacts', () => {
    it('should return a list of contacts', async () => {
        const contact = await resource.create({
            avatar: '',
            groups: [],
            properties: {
                address: null,
                birthday: null,
                city: null,
                email: null,
                firstname: null,
                home_number: null,
                lastname: null,
                mobile_number: null,
                notes: null,
                postal_code: null,
            },
        }) // make sure we receive some data...
        const res = await resource.list()
        expect.arrayContaining<Contact>(Array(res.data.length).fill(contactMatcher))

        await resource.delete(contact.id)
    })

    it('should create a contact, update and delete it again', async () => {
        const params: ContactsCreateParams = {
            avatar: '',
            groups: [],
            properties: {
                address: 'Willestr. 4-6',
                birthday: '2000-01-01',
                city: 'Kiel',
                email: 'support@seven.io',
                firstname: 'Seven',
                home_number: '43130149270',
                lastname: 'Communications',
                mobile_number: '491716992343',
                notes: 'CPaaS',
                postal_code: '24103',
            },
        }
        const created = await resource.create(params)
        expect(created.properties).toMatchObject(params.properties)

        const notes = 'The best CPaaS'
        const updated = await resource.update({...created, properties: {...created.properties, notes}})
        expect(updated.properties.notes).toEqual(notes)

        await resource.delete(created.id)
    })
})
