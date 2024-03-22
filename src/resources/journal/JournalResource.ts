import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import JournalPayload from './JournalPayload'
import type {JournalInbound, JournalOutbound, JournalParams, JournalReply, JournalVoice} from './types'

export default class JournalResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Journal
    }

    async inbound(p: JournalParams = {}): Promise<JournalInbound[]> {
        const payload = new JournalPayload({...p, type: 'inbound'})
        return this.client.request('get', this.endpoint, payload)
    }

    async outbound(p: JournalParams = {}): Promise<JournalOutbound[]> {
        const payload = new JournalPayload({...p, type: 'outbound'})
        return this.client.request('get', this.endpoint, payload)
    }

    replies = async (p: JournalParams = {}): Promise<JournalReply[]> => {
        const payload = new JournalPayload({...p, type: 'replies'})
        return this.client.request('get', this.endpoint, payload)
    }

    voice = async (p: JournalParams = {}): Promise<JournalVoice[]> => {
        const payload = new JournalPayload({...p, type: 'voice'})
        return this.client.request('get', this.endpoint, payload)
    }
}
