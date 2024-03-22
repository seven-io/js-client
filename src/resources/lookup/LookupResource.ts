import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import LookupPayload from './LookupPayload'
import type {CnamResponse, Format, HLR, LookupParams, MnpResponse} from './types'

export default class LookupResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Lookup
    }

    async cnam(p: LookupParams): Promise<CnamResponse[]> {
        const payload = new LookupPayload({
            ...p,
            type: 'cnam',
        })
        return this.client.request('post', this.endpoint, payload)
    }

    async format(p: LookupParams): Promise<Format[]> {
        const payload = new LookupPayload({...p, type: 'format'})
        return this.client.request('post', this.endpoint, payload)
    }

    async hlr(p: LookupParams): Promise<HLR[]> {
        const payload = new LookupPayload({
            ...p,
            type: 'hlr',
        })
        return this.client.request('post', this.endpoint, payload)
    }

    async mnp(p: LookupParams): Promise<MnpResponse[]> {
        const payload = new LookupPayload({
            ...p,
            type: 'mnp',
        })
        return this.client.request('post', this.endpoint, payload)
    }
}
