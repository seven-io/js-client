import {AbstractResource} from '../AbstractResource'
import type {RcsAgentsResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class AgentsResource extends AbstractResource {
    async all(): Promise<RcsAgentsResponse> {
        return await this.client.request('get', 'rcs/agents', (new ApiPayload).convert())
    }
}
