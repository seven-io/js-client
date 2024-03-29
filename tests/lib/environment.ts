const apiKey = process.env.SMS77_API_KEY;
const recipient = process.env.SMS77_RECIPIENT;

if (!apiKey) {
    throw new Error('process.env.SMS77_API_KEY must be set!');
}

if (!recipient) {
    throw new Error('process.env.SMS77_RECIPIENT must be set!');
}

export type Environment = {
    apiKey: string
    debug: boolean
    live: boolean
    recipient: string
}

const environment: Environment = {
    apiKey,
    debug: Boolean(process.env.SMS77_DEBUG),
    live: Boolean(process.env.SMS77_LIVE_TEST),
    recipient,
};

export default environment;
