import {Environment} from '../lib/environment';

export const environmentMatcher: Environment = {
    apiKey: expect.any(String),
    debug: expect.any(Boolean),
    live: expect.any(Boolean),
    recipient: expect.any(String),
}