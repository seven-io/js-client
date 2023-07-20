import SevenClient from '../src/SevenClient'
import {ValidateForVoiceResponse} from '../src/types'
import {dummyValidateForVoiceAllKeys} from './data/validateForVoice'
import client from './lib/client'

const validateForVoice: SevenClient['validateForVoice'] = process.env.SEVEN_LIVE_TEST
    ? client.validateForVoice : jest.fn(async () => dummyValidateForVoiceAllKeys)

describe('ValidateForVoice', () => {
    it('should return a json response', async () => {
        const res = await validateForVoice({number: process.env.SEVEN_RECIPIENT!})

        expect(res).not.toBeNull()


        const expected: ValidateForVoiceResponse = {
            error: expect.nilOrAny(String),
            success: expect.any(Boolean),
        }

        'code' in res && (expected.code = expect.any(String))
        'formatted_output' in res && (expected.formatted_output
            = expect.nilOrAny(String))
        'id' in res && (expected.id = expect.nilOrAny(Number))
        'sender' in res && (expected.sender = expect.any(String))
        'voice' in res && (expected.voice = expect.any(Boolean))

        expect.objectContaining<ValidateForVoiceResponse>(expected)
    })
})
