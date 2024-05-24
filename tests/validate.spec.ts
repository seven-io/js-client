import {ValidateResponse} from '../src'
import {ValidateResource} from '../src/resources/validate'
import client from './lib/client'

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
