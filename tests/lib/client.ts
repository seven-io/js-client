import Sms77Client from '../../src/Sms77Client';
import environment from './environment';

if (!environment.apiKey) {
    throw new Error('environment.apiKey is missing!');
}

export const env = environment;

export default new Sms77Client(environment.apiKey, 'js-test', environment.debug);