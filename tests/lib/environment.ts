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
    recipient: string
}

const environment: Environment = {
    apiKey,
    recipient,
};

export default environment;