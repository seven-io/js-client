import {ContactsAction} from '../src/constants/byEndpoint/contacts/ContactsAction'
import {ContactsResponseCode} from '../src/constants/byEndpoint/contacts/ContactsResponseCode'
import CsvToJson from '../src/lib/TextTransformer'
import Util from '../src/lib/Util'
import SevenClient from '../src/SevenClient'
import {Contact, ContactsParams} from '../src/types'
import {
    contactsWriteParams,
    dummyReadCsv,
    dummyReadJson,
    dummyWriteCsv,
    dummyWriteJson,
} from './data/contacts'
import './lib/afterEachWait'
import client from './lib/client'
import {contactMatcher} from './matchers/contacts'

const contacts: SevenClient['contacts'] = process.env.SEVEN_LIVE_TEST
    ? client.contacts : jest.fn(async (p: ContactsParams) => {
        if ('read' === p.action) {
            return p.json ? dummyReadJson : dummyReadCsv
        } else if ('write' === p.action) {
            return p.json ? dummyWriteJson : dummyWriteCsv
        }

        return 152
    })

let uid: number

const assertResponse = async (params: ContactsParams): Promise<void> => {
    const res = await contacts(params)

    expect(res).not.toBeNull()

    if (typeof res === 'string') {
        if ('read' === params.action) {
            expect.arrayContaining<Contact>(CsvToJson.contacts(res))
        } else if ('write' === params.action) {
            const [code, userId] = Util.splitByLine(res).map(s => s.trim())
            uid = Number.parseInt(userId)
            expect(typeof uid).toBe('number')
            expect(Number.parseInt(code)).toBe(ContactsResponseCode.Success)
        }
    } else if (Number.isInteger(res)) {
        if (params.json) {
            expect(Number.isInteger(res)).toBe(true)
            uid = res as number
        } else {
            expect(res === ContactsResponseCode.Success
                || res === ContactsResponseCode.Error).toBe(true)
        }
    } else {
        expect.arrayContaining<Contact>(Array((res as Contact[]).length)
            .fill(contactMatcher))
    }
}

describe('Contacts', () => {
    it('should return a csv list of contacts',
        async () => await assertResponse({action: ContactsAction.Read}))

    it('should return a json list of contacts',
        async () => await assertResponse({action: ContactsAction.Read, json: true}))

    it('should create a new contact and delete it again', async () => {
        await assertResponse(contactsWriteParams)

        await assertResponse({action: ContactsAction.Delete, id: uid})
    })

    it('should create a new contact and delete it again as json', async () => {
        await assertResponse({...contactsWriteParams, json: true})

        await assertResponse({action: ContactsAction.Delete, id: uid, json: true})
    })
})
