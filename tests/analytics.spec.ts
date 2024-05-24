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
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

jest.mock('../src', () => ({
    AnalyticsResource: jest.fn().mockImplementation((): ResourceMock<AnalyticsResource> => {
        return environment.live
            ? new AnalyticsResource(client)
            : {
                byCountry: async () => [
                    {
                        country: 'DE',
                        hlr: 16,
                        inbound: 0,
                        mnp: 8,
                        rcs: 1,
                        sms: 71,
                        usage_eur: 5.6375,
                        voice: 11,
                    },
                    {
                        country: '',
                        hlr: 0,
                        inbound: 0,
                        mnp: 0,
                        rcs: 1,
                        sms: 0,
                        usage_eur: 0,
                        voice: 0,
                    },
                ],
                byDate: async () => [
                    {
                        date: '2020-08-16',
                        hlr: 0,
                        inbound: 0,
                        mnp: 0,
                        rcs: 1,
                        sms: 0,
                        usage_eur: 0,
                        voice: 0,
                    },
                    {
                        date: '2020-08-17',
                        hlr: 0,
                        inbound: 0,
                        mnp: 0,
                        rcs: 1,
                        sms: 0,
                        usage_eur: 0,
                        voice: 0,
                    },
                    {
                        date: '2020-08-18',
                        sms: 0,
                        voice: 10,
                        hlr: 8,
                        mnp: 4,
                        inbound: 0,
                        usage_eur: 0.1,
                    },
                    {
                        date: '2020-08-19',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.0225,
                    },
                    {
                        date: '2020-08-20',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-21',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-22',
                        sms: 10,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.75,
                    },
                    {
                        date: '2020-08-23',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-24',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-25',
                        sms: 4,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.3,
                    },
                    {
                        date: '2020-08-26',
                        sms: 4,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.3,
                    },
                    {
                        date: '2020-08-27',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-28',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-29',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-30',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-08-31',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                    {
                        date: '2020-09-01',
                        sms: 23,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 1.725,
                    },
                    {
                        date: '2020-09-02',
                        sms: 5,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.375,
                    },
                    {
                        date: '2020-09-03',
                        sms: 1,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.075,
                    },
                    {
                        date: '2020-09-04',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-05',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-06',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-07',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-08',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-09',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-10',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-11',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-12',
                        sms: 3,
                        voice: 1,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.3,
                    },
                    {
                        date: '2020-09-13',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-14',
                        sms: 2,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0.15,
                    },
                    {
                        date: '2020-09-15',
                        sms: 1,
                        voice: 0,
                        hlr: 8,
                        mnp: 4,
                        inbound: 0,
                        usage_eur: 0.19,
                    },
                ],
                byLabel: async () => [
                    {
                        label: '',
                        sms: 71,
                        voice: 11,
                        hlr: 16,
                        mnp: 8,
                        inbound: 0,
                        usage_eur: 5.6375,
                    },
                    {
                        label: '',
                        sms: 0,
                        voice: 0,
                        hlr: 0,
                        mnp: 0,
                        inbound: 0,
                        usage_eur: 0,
                    },
                ],
                bySubaccount: async () => [
                    {
                        account: 'André Matthies',
                        sms: 71,
                        voice: 11,
                        hlr: 16,
                        mnp: 8,
                        inbound: 0,
                        usage_eur: 5.6375,
                    },
                ],
            }
    }),
}))

const resource = new AnalyticsResource(client)

const assertBaseAnalytic = <T extends AnalyticBase>(arr: AnalyticBase[], groupBy: string): void => {
    const analyticsBaseMatcher: AnalyticBase = {
        sms: expect.any(Number),
        hlr: expect.any(Number),
        inbound: expect.any(Number),
        mnp: expect.any(Number),
        usage_eur: expect.any(Number),
        voice: expect.any(Number),
    }

    const expected = {...analyticsBaseMatcher, [groupBy]: expect.any(String)}

    expect.arrayContaining<T>(Array(arr.length).fill(expected))
}

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
