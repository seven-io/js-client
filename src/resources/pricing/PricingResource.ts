import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import type {PricingParams, PricingResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class PricingResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Pricing
    }

    get = async (p?: PricingParams): Promise<PricingResponse> => {
        const payload = new ApiPayload(p)
        return await this.client.request('get', this.endpoint, payload)
    }
}
