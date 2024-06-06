import client from './lib/client'
import {unionMatcher} from './lib/utils'
import {SMS_TYPES, type SmsFile, type SmsMessage, type SmsParams, SmsResource, type SmsResponse} from '../src'

const resource = new SmsResource(client)
const smsMatcher = (res: SmsResponse) => ({
    balance: expect.any(Number),
    debug: expect.stringMatching(new RegExp('false|true')),
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
            flash: false,
            foreign_id: 'TestForeignID',
            from: 'Tom Tester',
            label: 'TestLabel',
            performance_tracking: true,
            text: 'Hello',
            to: ['4917123456789'],
            ttl: 128000,
            udh: 'MyTestHeader',
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
                contents: 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABX5JREFUaEPtWGuIlFUYfp5vtm03XElFKqILJhb+sAtRWRZrq+7Ozjln17W1jaxMM0oSs4u3MteSIiso+9Hthz/UyJZM55yZgTSI6IdEUIJIIEFIUVQGUbjI7ve9cbYZW/c2386MLsKeXwPzXp7nfc95zns+4jxfPM/xY5zAWHdwvAPjHSizAuf/FlJKdQJYSXIqIMBpYer/O2aZBrgUjVDUYMS8RwG8S6XUIZKnRCSKCRMkJwKYLCKTCU4cKMYi8sUZtYgbuM8uFqsEyTu9tSfQSXJzn6vI1yT3R1GUzmQyR+LkbWxsnFxdXd0IoAHEbAhm9gPxsrX2uThx4to0NzdflUhc0AlESwF09Z0BY0yTiMwTkQaSN+TJHCf5sYjsd859FTdBS0vLzDAMHyK51vtEUbQ4k8l0xfUfyU4pdS/JjQBmAfjNWnvJoEOslLolABqEnA9gbj5gCGCXiHzinLNxwBQ667eTc64QJ47rIJv29vbq7u7urSSfzRf3Lefck31baKSIyWTymqqqqnkAkgBaCrYi8jnJXTU1NZ92dXX9NTBGMpm8MJFIHCQ5R0S2OOe8UJS0jDF3RVH0AsmGfIDZ1tpDhWCxZTSVSk3yQUgaAIsEuMg7i8j3nkwikdi9b9++H31gpdQbJJ8C8C2AOdbak6WgV0r5im8gOUlErHPO5z5jxSYw0FFrfbeItHkyJC/N//+3iOwi+Xh+/9+XyWQ+Gi14Y8z0KIpeItmRF6X7rbUfDhWnZAL9gxljbo6iqEBmRn6flrR1tNYPiMjzJGeIREecy/gD67V1yFURAoXISqlHQH5AYK+1dtFoKt9a33pxWBe+CGCV9wtFNmWd21osRsUIGGNmichhAEdFJOmcO14s+f/EWxvIcAuAOwCc6O3tvTWXy/0Qx78iBNrb22u7u08eBjmdYJO19rM4yb2NMWZTFEUbSdaIyA7n3LK4vt6uIgS01jsBLEGI1TZrt8cBoJS6nqSX19Y+IOSCdDp9II5vf5uyCaikWssqvioi7zjnVsYBoJR6mAy2AHKFiBx0zvlLs6RVFgFjTJu/nf1tG4ZhUy6XOzUSCqXU5QA2k1yRt3vMWvteScjzTiUT8Ic2iqIsgASAJuecP8DDrlQqZYIg8EPjTSJypLa2ds5Qt/hoyZREoL6+vqauri4LyFwRdDjn9gyXuL5+ac2ECX+s7zfxbnPOrRst0OHsSyKgtfZtf7TYnJNKpW4n6ecYP26fCMNwXjab/a5S4EtSoVQq9XTA4HUQX/ohb7g5Ryn1BAAPfiqAndbaBysJvBBrVB1QSmmSaRH5NQyC5lw67Ye1M1Zzc/OMRCKxAYB/cHh5XJROp/eeDfCj6oAx5lp/aElOi6JoyCEtlUp1BEGwCcDMcuUxLuG4HfBPzxzIRgKbrbV+Zjm9Fi5cOKWnp2dd4cEBYI219s24IMqxi0VAa70dglUC2e2cW9I/oTFmfn4UqPfyGIZhMpfL/VQOqNH4FiXgDyPJt0Ec6u3pNblc7vdCAq21l0P/aK8TkYrKY1wSIxLQSb2AVchGIn8CaCs87o0xN4rIegCLvTySbEun016VzvkalkBra8fVvb3/5EheJyLLnHM7PDqt9XIR8dPjtLMpj3ErMSwBpdR+//4VkVeccxuVUleS9Fumb2ATkRFv4LgAyrUbkoDW+jUAz4jIHudch9baj7we/G1eHsMwVMUGt3KBxfUf6rvQCpLvA/gmDMN7GATL+d+XgapzKY8lE9BaHxORKQDaSa4BkPLyiFNocwfcsbiBz5XdoA5orQtfAH4BcFkosi1bwemx0sQGbyGjOhH1HdSfgyBYPVbyGJdo0YssbqCxshsnMFaVL+Qd78B4B8qswPgWKrOAZbv/Cy2IQhpnTW6dAAAAAElFTkSuQmCC',
                name,
                password: 'password',
                validity: 1,
            })

            text += `TestFile${i}: [[${name}]]\n`
        }

        const params: SmsParams = {
            delay: new Date('2050-12-12 00:00:00'),
            files,
            text,
            to: ['491716992343'],
        }
        const res = await resource.dispatch(params)
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
