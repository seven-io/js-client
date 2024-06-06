import {AbstractResource} from '../AbstractResource'
import LookupPayload from './LookupPayload'
import type {CnamResponse, Format, HLR, LookupParams, MnpResponse, RcsCapabilities} from './types'

export default class LookupResource extends AbstractResource {
    async cnam(p: LookupParams): Promise<CnamResponse[]> {
        const res = await this.client.request('get', 'lookup/cnam', new LookupPayload(p).convert())

        return (Array.isArray(res) ? res : [res]) as CnamResponse[]
    }

    async format(p: LookupParams): Promise<Format[]> {
        return await this.client.request('get', 'lookup/format', new LookupPayload(p).convert())
    }

    async hlr(p: LookupParams): Promise<HLR[]> {
        return await this.client.request('get', 'lookup/hlr', new LookupPayload(p).convert())
    }

    async mnp(p: LookupParams): Promise<MnpResponse[]> {
        return await this.client.request('get', 'lookup/mnp', new LookupPayload(p).convert())
    }

    async rcs(p: LookupParams): Promise<RcsCapabilities[]> {
        return await this.client.request('get', 'lookup/rcs', new LookupPayload(p).convert())
    }
}
