import Client from '../../src/Client'
import environment from './environment'

export default new Client({
    apiKey: environment.apiKey,
    debug: environment.debug,
    sentWith: 'js-test',
})
