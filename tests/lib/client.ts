import fetch from 'node-fetch'
import Sms77Client from '../../src/Sms77Client';
import environment from './environment';

if (!globalThis.fetch) {
    (globalThis as any).fetch = fetch;
}

if (!environment.apiKey) {
    throw new Error('environment.apiKey is missing!');
}

export default new Sms77Client(environment.apiKey, 'js-test');