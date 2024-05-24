import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import LookupPayload from './LookupPayload'
import type {CnamResponse, Format, HLR, LookupParams, MnpResponse} from './types'

export default class LookupResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Lookup
    }

    async cnam(p: LookupParams): Promise<CnamResponse[]> {
        const payload = new LookupPayload(p)
        return this.client.request('post', `${this.endpoint}/cnam`, payload)
    }

    async format(p: LookupParams): Promise<Format[]> {
        const payload = new LookupPayload(p)
        return this.client.request('post', `${this.endpoint}/format`, payload)
    }

    async hlr(p: LookupParams): Promise<HLR[]> {
        const payload = new LookupPayload(p)
        return this.client.request('post', `${this.endpoint}/hlr`, payload)
    }

    async mnp(p: LookupParams): Promise<MnpResponse[]> {
        const payload = new LookupPayload(p)
        return this.client.request('post', `${this.endpoint}/mnp`, payload)
    }
}
