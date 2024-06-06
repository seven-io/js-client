import {AbstractResource} from '../AbstractResource'
import type {PricingParams, PricingResponse} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class PricingResource extends AbstractResource {
    get = async (p?: PricingParams): Promise<PricingResponse> => {
        return await this.client.request('get', 'pricing', new ApiPayload(p).convert())
    }
}
