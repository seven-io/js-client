import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import JournalPayload from './JournalPayload'
import type {JournalInbound, JournalOutbound, JournalParams, JournalReply, JournalVoice} from './types'

export default class JournalResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Journal
    }

    async inbound(p: JournalParams = {}): Promise<JournalInbound[]> {
        const payload = new JournalPayload(p).convert()
        return this.client.request('get', `${this.endpoint}/inbound`, payload)
    }

    async outbound(p: JournalParams = {}): Promise<JournalOutbound[]> {
        const payload = new JournalPayload(p).convert()
        return this.client.request('get', `${this.endpoint}/outbound`, payload)
    }

    replies = async (p: JournalParams = {}): Promise<JournalReply[]> => {
        const payload = new JournalPayload(p).convert()
        return this.client.request('get', `${this.endpoint}/replies`, payload)
    }

    voice = async (p: JournalParams = {}): Promise<JournalVoice[]> => {
        const payload = new JournalPayload(p).convert()
        return this.client.request('get', `${this.endpoint}/voice`, payload)
    }
}
