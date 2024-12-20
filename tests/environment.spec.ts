import environment, {type Environment} from './lib/environment'

describe('Environment', () => {
    it('should have environment variables set', () => {
        expect(environment).toMatchObject<Environment>({
            apiKey: expect.any(String),
            debug: expect.any(Boolean),
            sentWith: expect.any(String),
            signingSecret: expect.any(String)
        })
    })
})
