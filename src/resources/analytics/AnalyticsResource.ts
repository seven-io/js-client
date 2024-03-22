import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import AnalyticsPayload from './AnalyticsPayload'
import {
    AnalyticGroupByCountry,
    AnalyticGroupByDate,
    AnalyticGroupByLabel,
    AnalyticGroupBySubaccount,
    AnalyticsParams,
} from './types'

export default class AnalyticsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Analytics
    }

    async byCountry(p?: AnalyticsParams): Promise<AnalyticGroupByCountry[]> {
        const payload = new AnalyticsPayload({...p, groupBy: 'country'})
        return await this.client.request('get', this.endpoint, payload)
    }

    async byDate(p?: AnalyticsParams): Promise<AnalyticGroupByDate[]> {
        const payload = new AnalyticsPayload({...p, groupBy: 'date'})
        return await this.client.request('get', this.endpoint, payload)
    }

    async byLabel(p?: AnalyticsParams): Promise<AnalyticGroupByLabel[]> {
        const payload = new AnalyticsPayload({...p, groupBy: 'label'})
        return await this.client.request('get', this.endpoint, payload)
    }

    async bySubaccount(p?: AnalyticsParams): Promise<AnalyticGroupBySubaccount[]> {
        const payload = new AnalyticsPayload({...p, groupBy: 'subaccount'})
        return await this.client.request('get', this.endpoint, payload)
    }
}
