const apiKey = process.env.SMS77_API_KEY;
const recipient = process.env.SMS77_RECIPIENT;
const debug = process.env.SMS77_DEBUG;

if (!apiKey) {
    throw new Error('process.env.SMS77_API_KEY must be set!');
}

if (!recipient) {
    throw new Error('process.env.SMS77_RECIPIENT must be set!');
}

export type Environment = {
    apiKey: string
    debug: boolean,
    recipient: string
}

const environment: Environment = {
    apiKey,
    debug: Boolean(debug),
    recipient,
};

export default environment;