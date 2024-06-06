import {AbstractResource} from '../AbstractResource'
import AnalyticsPayload from './AnalyticsPayload'
import type {
    AnalyticGroupByCountry,
    AnalyticGroupByDate,
    AnalyticGroupByLabel,
    AnalyticGroupBySubaccount,
    AnalyticsParams,
} from './types'

export default class AnalyticsResource extends AbstractResource {
    async byCountry(p: AnalyticsParams = {}): Promise<AnalyticGroupByCountry[]> {
        const payload = new AnalyticsPayload(p).convert()
        return await this.client.request('get', 'analytics/country', payload)
    }

    async byDate(p: AnalyticsParams = {}): Promise<AnalyticGroupByDate[]> {
        const payload = new AnalyticsPayload(p).convert()
        return await this.client.request('get', 'analytics/date', payload)
    }

    async byLabel(p: AnalyticsParams = {}): Promise<AnalyticGroupByLabel[]> {
        const payload = new AnalyticsPayload(p).convert()
        return await this.client.request('get', 'analytics/label', payload)
    }

    async bySubaccount(p: AnalyticsParams = {}): Promise<AnalyticGroupBySubaccount[]> {
        const payload = new AnalyticsPayload(p).convert()
        return await this.client.request('get', 'analytics/subaccount', payload)
    }
}
