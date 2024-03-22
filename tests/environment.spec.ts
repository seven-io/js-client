import environment, {Environment} from './lib/environment'

describe('Environment', () => {
    it('should have environment variables set', () => {
        expect(environment).toMatchObject<Environment>({
            apiKey: expect.any(String),
            debug: expect.any(Boolean),
            live: expect.any(Boolean),
        })
    })
})
