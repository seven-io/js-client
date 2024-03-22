const {
    SEVEN_API_KEY: apiKey,
    SEVEN_DEBUG: debug,
    SEVEN_LIVE_TEST: liveTest,
} = process.env

if (!apiKey) throw new Error('process.env.SEVEN_API_KEY must be set!')

export type Environment = {
    apiKey: string
    debug: boolean
    live: boolean
}

const environment: Environment = {
    apiKey,
    debug: Boolean(debug),
    live: Boolean(liveTest),
}

export default environment
