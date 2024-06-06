import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import LookupPayload from './LookupPayload'
import type {CnamResponse, Format, HLR, LookupParams, MnpResponse, RcsCapabilities} from './types'

export default class LookupResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Lookup
    }

    async cnam(p: LookupParams): Promise<CnamResponse[]> {
        const payload = new LookupPayload(p).convert()
        const res = await this.client.request('post', `${this.endpoint}/cnam`, payload)

        return (Array.isArray(res) ? res : [res]) as CnamResponse[]
    }

    async format(p: LookupParams): Promise<Format[]> {
        const payload = new LookupPayload(p).convert()
        return await this.client.request('post', `${this.endpoint}/format`, payload)
    }

    async hlr(p: LookupParams): Promise<HLR[]> {
        const payload = new LookupPayload(p).convert()
        return await this.client.request('post', `${this.endpoint}/hlr`, payload)
    }

    async mnp(p: LookupParams): Promise<MnpResponse[]> {
        const payload = new LookupPayload(p).convert()
        return await this.client.request('post', `${this.endpoint}/mnp`, payload)
    }

    async rcs(p: LookupParams): Promise<RcsCapabilities[]> {
        const payload = new LookupPayload(p).convert()
        return await this.client.request('post', `${this.endpoint}/rcs`, payload)
    }
}
