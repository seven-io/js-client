import SevenClient from '../../src/SevenClient'
import environment from './environment'

if (!environment.apiKey) {
    throw new Error('environment.apiKey is missing!')
}

export const env = environment

export default new SevenClient(environment.apiKey, 'js-test', environment.debug)
