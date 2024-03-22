import {ValidateResponse} from '../src'
import {ValidateResource} from '../src/resources/validate'
import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

const dummyValidateForVoice: ValidateResponse = {
    code: '661951',
    error: null,
    success: true,
}

const dummyValidateForVoiceAllKeys: ValidateResponse = {
    ...dummyValidateForVoice,
    formatted_output: null,
    id: null,
    sender: '',
    voice: true,
}

jest.mock('../src', () => ({
    ValidateResource: jest.fn().mockImplementation((): ResourceMock<ValidateResource> => {
        return environment.live
            ? new ValidateResource(client)
            : {
                async start() {
                    return dummyValidateForVoiceAllKeys
                },
            }
    }),
}))

const resource = new ValidateResource(client)

describe('Validate', () => {
    it('should return a validation json response', async () => {
        const res = await resource.start({number: '4917123456789'})

        expect(res).not.toBeNull()

        const expected: ValidateResponse = {
            error: expect.nilOrAny(String),
            success: expect.any(Boolean),
        }

        'code' in res && (expected.code = expect.any(String))
        'formatted_output' in res && (expected.formatted_output
            = expect.nilOrAny(String))
        'id' in res && (expected.id = expect.nilOrAny(Number))
        'sender' in res && (expected.sender = expect.any(String))
        'voice' in res && (expected.voice = expect.any(Boolean))

        expect.objectContaining<ValidateResponse>(expected)
    })
})
