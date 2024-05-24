import {subDays} from 'date-fns'
import {
    AnalyticBase,
    AnalyticGroupByCountry,
    AnalyticGroupByDate,
    AnalyticGroupByLabel,
    AnalyticGroupBySubaccount,
    AnalyticsResource,
} from '../src'
import client from './lib/client'

const resource = new AnalyticsResource(client)

describe('Analytics', () => {
    it('should return an array of analytics grouped by date',
        async () => {
            const arr = await resource.byDate()
            assertBaseAnalytic<AnalyticGroupByDate>(arr, 'date')
        })

    it('should return an array of analytics grouped by country',
        async () => {
            const arr = await resource.byCountry()
            assertBaseAnalytic<AnalyticGroupByCountry>(arr, 'country')
        })

    it('should return an array of analytics grouped by label',
        async () => {
            const arr = await resource.byLabel()
            assertBaseAnalytic<AnalyticGroupByLabel>(arr, 'label')
        })

    it('should return an array of analytics grouped by subaccount',
        async () => {
            const arr = await resource.bySubaccount()
            assertBaseAnalytic<AnalyticGroupBySubaccount>(arr, 'account')
        })

    it('should return an array of analytics for all subaccounts',
        async () => {
            const arr = await resource.bySubaccount({subaccounts: 'all'})
            assertBaseAnalytic<AnalyticGroupBySubaccount>(arr, 'account')
        })

    it('should return an array of analytics for messages with empty label',
        async () => {
            const arr = await resource.byLabel({label: ''})
            assertBaseAnalytic<AnalyticGroupByLabel>(arr, 'label')
        })

    it('should return an array of analytics for messages within timeframe',
        async () => {
            const arr = await resource.byDate({
                end: new Date,
                start: subDays(new Date, 30),
            })
            assertBaseAnalytic<AnalyticGroupByDate>(arr, 'label')
        })
})

function assertBaseAnalytic<T extends AnalyticBase>(arr: AnalyticBase[], groupBy: string): void {
    const analyticsBaseMatcher: AnalyticBase = {
        hlr: expect.any(Number),
        inbound: expect.any(Number),
        mnp: expect.any(Number),
        rcs: expect.any(Number),
        sms: expect.any(Number),
        usage_eur: expect.any(Number),
        voice: expect.any(Number),
    }

    const expected = {...analyticsBaseMatcher, [groupBy]: expect.any(String)}

    expect.arrayContaining<T>(Array(arr.length).fill(expected))
}