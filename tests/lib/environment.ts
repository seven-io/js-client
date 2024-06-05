import type {ClientOptions} from '../../src/Client'

const {
    SEVEN_API_KEY: apiKey,
    SEVEN_DEBUG: debug,
    SEVEN_SIGNING_SECRET: signingSecret,
} = process.env

if (!apiKey) throw new Error('process.env.SEVEN_API_KEY must be set!')
if (!signingSecret) throw new Error('process.env.SEVEN_SIGNING_SECRET must be set!')

export type Environment = Required<ClientOptions>

const environment: Environment = {
    apiKey,
    debug: Boolean(debug),
    sentWith: 'js-client-test',
    signingSecret
}

export default environment
