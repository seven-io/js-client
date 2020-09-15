import {Environment} from '../lib/environment';

export const environmentMatcher: Environment = {
    apiKey: expect.any(String),
    recipient: expect.any(String),
}