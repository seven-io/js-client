import {AbstractResource} from '../AbstractResource'
import JournalPayload from './JournalPayload'
import type {JournalInbound, JournalOutbound, JournalParams, JournalVoice} from './types'

export default class JournalResource extends AbstractResource {
    async inbound(p: JournalParams = {}): Promise<JournalInbound[]> {
        return this.client.request('get', 'journal/inbound', new JournalPayload(p).convert())
    }

    async outbound(p: JournalParams = {}): Promise<JournalOutbound[]> {
        return this.client.request('get', 'journal/outbound', new JournalPayload(p).convert())
    }

    voice = async (p: JournalParams = {}): Promise<JournalVoice[]> => {
        return this.client.request('get', 'journal/voice', new JournalPayload(p).convert())
    }
}
