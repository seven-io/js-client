import client from './lib/client'
import {ContactsResource} from '../src/resources'
import type {Contact} from '../src/resources/contacts/types'

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
    it('should return a json list of contacts',
        async () => {
            await resource.create({
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
            expect.arrayContaining<Contact>(Array(res.length).fill(contactMatcher))
        })

    it('should create a new contact and delete it again', async () => {
        const params: Pick<Contact, 'avatar' | 'groups' | 'properties'> = {
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
        const res = await resource.create(params)
        expect(res.properties).toMatchObject(params.properties)

        await resource.delete(res.id)
    })
})
