const {
    SEVEN_API_KEY: apiKey,
    SEVEN_DEBUG: debug,
} = process.env

if (!apiKey) throw new Error('process.env.SEVEN_API_KEY must be set!')

export type Environment = {
    apiKey: string
    debug: boolean
}

const environment: Environment = {
    apiKey,
    debug: Boolean(debug),
}

export default environment
