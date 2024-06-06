import STRING_BOOLEAN_VALUES from '../src/lib/StringBooleanValues'
import client from './lib/client'
import {unionMatcher} from './lib/utils'
import {SMS_TYPES, type SmsFile, type SmsMessage, type SmsParams, SmsResource, type SmsResponse} from '../src'

const resource = new SmsResource(client)
const smsMatcher = (res: SmsResponse) => ({
    balance: expect.any(Number),
    debug: expect.stringMatching(unionMatcher(STRING_BOOLEAN_VALUES)),
    messages: expect.arrayContaining(Array(res.messages.length)
        .fill(expect.objectContaining<SmsMessage>({
            encoding: expect.any(String),
            error: expect.nilOrAny(String),
            error_text: expect.nilOrAny(String),
            id: expect.nilOrAny(String),
            is_binary: expect.any(Boolean),
            label: expect.nilOrAny(String),
            messages: expect.nilOrAny(Array),
            parts: expect.any(Number),
            price: expect.any(Number),
            recipient: expect.any(String),
            sender: expect.any(String),
            success: expect.any(Boolean),
            text: expect.any(String),
            udh: expect.nilOrAny(String),
        }))),
    sms_type: expect.any(unionMatcher(SMS_TYPES)),
    success: expect.any(String),
    total_price: expect.any(Number),
})
const assertJSON = (res: SmsResponse) => expect.objectContaining<SmsResponse>(smsMatcher(res))

describe('SMS', () => {
    it('should return json response', async () => {
        const params: SmsParams = {
            delay: new Date('2050-12-12 00:00:00'),
            text: 'Hello',
            to: ['4917123456789'],
        }
        const res = await resource.dispatch(params)
        assertJSON(res)
    })

    it('should send file and return json response', async () => {
        const files: SmsFile[] = []
        let text = ''
        for (let i = 0; i < 2; i++) {
            const name = `test${i}.png`

            files.push({
                contents: Buffer.from('abc123', 'base64').toString(),
                name,
            })

            text += `TestFile${i}: [[${name}]]\n`
        }

        const res = await resource.dispatch({
            delay: new Date('2050-12-12 00:00:00'),
            files,
            flash: false,
            foreign_id: 'TestForeignID',
            from: 'Tom Tester',
            label: 'TestLabel',
            performance_tracking: true,
            text,
            to: ['4917123456789'],
            ttl: 128000,
            udh: 'MyTestHeader',
        })
        await assertJSON(res)
    })

    it('should delete nothing', async () => {
        const {deleted, success} = await resource.delete({ids: []})
        expect(deleted).not.toBeNull()
        expect(deleted!.length).toBe(0)
        expect(success).toBe(false)
    })

    it('should task a sms and delete it again', async () => {
        const {messages} = await resource.dispatch({
            delay: new Date('2035-12-30 23:25:04'),
            text: 'X',
            to: ['+49123456789'],
        })
        const id = messages[0].id
        expect(id).not.toBeNull()

        const {deleted, success} = await resource.delete({ids: [id!]})

        expect(deleted).not.toBeNull()
        expect(deleted!.length).toBe(1)
        expect(deleted![0]).toBe(id)
        expect(success).toBe(true)
    })
})
