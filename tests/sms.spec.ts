import {promises} from 'fs'
import {resolve} from 'path'
import {
    SmsDeleteParams,
    SmsDeleteResponse,
    SmsFile,
    SmsJsonResponse,
    SmsParams,
} from '../src/types'
import {SMS_TYPES} from '../src/constants/byEndpoint/sms'
import toBool from './lib/toBool'
import numberMatcher from './lib/numberMatcher'
import unionMatcher from './lib/unionMatcher'
import client from './lib/client'
import Util from '../src/lib/Util'
import {smsMatcher} from './matchers/sms'
import {
    detailedDummy,
    fullSmsParams,
    jsonDummy,
    msgIdDummy,
    OptionalSmsParams,
    requiredSmsParams
} from './data/sms'
import Sms77Client from '../src/Sms77Client'

const sms: Sms77Client['sms'] = process.env.SMS77_LIVE_TEST
    ? client.sms : jest.fn(async (p: SmsParams) => {
        if (p.json) return jsonDummy(p)

        if (p.return_msg_id) return msgIdDummy

        if (p.details) return detailedDummy(p)

        return 100
    })

const deleteSMS: Sms77Client['deleteSMS'] = process.env.SMS77_LIVE_TEST
    ? client.deleteSMS
    : jest.fn(async (p: SmsDeleteParams): Promise<SmsDeleteResponse> => ({
        deleted: p.ids,
        success: true,
    }))

const assertJson = (res: SmsJsonResponse) =>
    expect.objectContaining<SmsJsonResponse>(smsMatcher(res))

const assertResponse = async (
    extras: OptionalSmsParams, text: string = requiredSmsParams.text): Promise<void> => {
    const params: SmsParams = {...requiredSmsParams, ...extras, text}
    const res = await sms(params)
    const type = typeof res

    expect(res).not.toBeNull()

    if (type === 'string') {
        assertString(res as string, params)
    } else if (type === 'number') {
        expect(typeof res).toBe('number')
    } else {
        assertJson(res as SmsJsonResponse)
    }
}

const assertString = (res: string, params: SmsParams): void => {
    const values = Util.splitByLine(res)
    let expectedArrayLength = 2

    expect(values[0].length).toBe(3)

    if (params.details) {
        expectedArrayLength = 10

        expect(values[1]).toMatch(numberMatcher('Verbucht: '))
        expect(values[2]).toMatch(numberMatcher('Preis: '))
        expect(values[3]).toMatch(numberMatcher('Guthaben: '))
        expect(values[4]).toMatch(`Text: ${params.text}`)
        expect(values[5]).toMatch(unionMatcher(SMS_TYPES, 'SMS-Typ: '))
        expect(values[6]).toMatch(`Flash SMS: ${toBool('flash', params)}`)
        expect(values[7].startsWith('Encoding: ')).toBe(true)
        expect(values[8].startsWith('GSM0338: ')).toBe(true)
        expect(values[9]).toMatch(/Debug: (true|false)/)
    } else {
        expect(values[1]).toMatch(numberMatcher())
    }

    expect(values.length).toEqual(expectedArrayLength)
}

describe('SMS', () => {
    it('should return numbered success code',
        async () => await assertResponse({}))

    it('should return detailed text response',
        async () => await assertResponse({details: true,}))

    it('should return text response with msg id',
        async () => await assertResponse({return_msg_id: true,}))

    it('should return json response',
        async () => await assertResponse(fullSmsParams))

    it('should send file and return json response',
        async () => {
            const contents = (await promises.readFile(
                resolve(__dirname, './lib/png.base64'))).toString()

            const files: SmsFile[] = []
            let text = ''
            for (let i = 0; i < 2; i++) {
                const name = `test${i}.png`

                files.push({
                    contents,
                    name,
                })

                text += `TestFile${i}: [[${name}]]\n`
            }

            await assertResponse({...fullSmsParams, files, flash: false}, text)
        })

    it('should delete nothing', async () => {
        const {deleted, success} = await deleteSMS({ids: []})
        expect(deleted.length).toBe(0)
        expect(success).toBe(true)
    })

    it('should task a sms and delete it again', async () => {
        const {messages} = await sms({
            debug: false,
            delay: '2035-12-30 23:25:04',
            json: true,
            text: 'X',
            to: '+49123456789',
        }) as SmsJsonResponse
        const id = messages[0].id
        expect(id).not.toBeNull()

        const {deleted, success} = await deleteSMS({ids: [id!]})
        expect(deleted.length).toBe(1)
        expect(deleted[0]).toBe(id)
        expect(success).toBe(true)
    })
})
