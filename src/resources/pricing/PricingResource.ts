import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import PricingPayload from './PricingPayload'
import type {PricingParams, PricingResponse} from './types'

export default class PricingResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Pricing
    }

    get = async (p?: PricingParams): Promise<PricingResponse> => {
        const payload = new PricingPayload({...p})
        return await this.client.request('get', this.endpoint, payload)
    }
}
