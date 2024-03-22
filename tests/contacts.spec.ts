import {Contact, ContactsResource} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

jest.mock('../src', () => ({
    ContactsResource: jest.fn().mockImplementation((): ResourceMock<ContactsResource> => {
        return environment.live
            ? new ContactsResource(client)
            : {
                delete: async () => ({return: 152}),
                read: async () => [
                    {
                        customField: 'any value',
                        email: '',
                        id: 4798035,
                        nick: '',
                        number: '',
                    },
                    {
                        email: '',
                        id: 4799646,
                        nick: '',
                        number: '',
                    },
                    {
                        email: '',
                        id: 4799647,
                        nick: '',
                        number: '',
                    },
                    {
                        email: '',
                        id: 4799648,
                        nick: '',
                        number: '',
                    },
                    {
                        email: '',
                        id: 4799649,
                        nick: '',
                        number: '',
                    },
                    {
                        email: '',
                        id: 3172517,
                        nick: 'Hansi',
                        number: '004917666666666',
                    },
                    {
                        email: '',
                        id: 2925186,
                        nick: 'Tatti',
                        number: '004919016315610',
                    },
                    {
                        email: '',
                        id: 3172515,
                        nick: 'Tatti',
                        number: '004917777777777',
                    },
                ],
                write: async () => ({id: 5125215, return: 152}),
            }
    }),
}))

const resource = new ContactsResource(client)

describe('Contacts', () => {
    it('should return a json list of contacts',
        async () => {
            const res = await resource.read()
            const contactMatcher: Contact = {
                customFields: expect.any(Array),
                email: expect.any(String),
                id: expect.any(Number),
                nick: expect.any(String),
                number: expect.any(String),
            }
            expect.arrayContaining<Contact>(Array(res.length).fill(contactMatcher))
        })

    it('should create a new contact and delete it again', async () => {
        const res = await resource.write({
            email: 'tom@test.er',
            mobile: '+490123457890',
            nick: 'Tom Tester',
        })
        expect(res).toMatchObject({
            id: expect.any(Number),
            return: expect.any(Number),
        })

        const res2 = await resource.delete(res.id)
        expect(res2).toMatchObject({
            return: expect.any(Number),
        })
    })
})
