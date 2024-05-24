import {SMS_TYPES, SmsFile, SmsMessage, SmsParams, SmsResource, SmsResponse} from '../src'
import STRING_BOOLEAN_VALUES from '../src/lib/StringBooleanValues'
import client from './lib/client'
import {unionMatcher} from './lib/utils'

type OptionalSmsParams = Omit<SmsParams, 'text' | 'to'>;

const fullSmsParams: OptionalSmsParams = {
    flash: true,
    foreign_id: 'TestForeignID',
    from: 'Tom Tester',
    json: true,
    label: 'TestLabel',
    no_reload: true,
    performance_tracking: true,
    ttl: 128000,
    udh: 'MyTestHeader',
    unicode: true,
    utf8: true,
}

const requiredSmsParams: Pick<SmsParams, 'text' | 'to'> = {
    text: `The current date is: ${Date.now()}.`,
    to: ['4917123456789'],
}

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
const assertJSON = (res: SmsResponse) =>
    expect.objectContaining<SmsResponse>(smsMatcher(res))

describe('SMS', () => {
    it('should return json response',
        async () => assertJSON(await resource.dispatch({...requiredSmsParams, ...fullSmsParams})))

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

        const {details, json, return_msg_id, ...params} = fullSmsParams
        const res = await resource.dispatch({
            ...params,
            ...requiredSmsParams,
            files,
            flash: false,
            text,
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
            debug: false,
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
