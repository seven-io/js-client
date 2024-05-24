import {Contact, ContactsResource} from '../src'
import client from './lib/client'

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
