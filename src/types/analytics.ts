import {
    ANALYTICS_GROUPS,
    ANALYTICS_LABELS,
    ANALYTICS_SUBACCOUNTS
} from '../constants/byEndpoint/analytics';

export type AnalyticBase = {
    hlr: number
    inbound: number
    mnp: number
    sms: number
    usage_eur: number
    voice: number
}
export type AnalyticGroupByCountry = AnalyticBase & { country: string }
export type AnalyticGroupByDate = AnalyticBase & { date: string }
export type AnalyticGroupBySubaccount = AnalyticBase & { account: string }
export type AnalyticGroupByLabel = AnalyticBase & { label: string }
export type Analytic = AnalyticGroupByCountry
    | AnalyticGroupByDate
    | AnalyticGroupBySubaccount
    | AnalyticGroupByLabel
export type AnalyticsGroupBy = typeof ANALYTICS_GROUPS[number]
export type AnalyticsLabel = typeof ANALYTICS_LABELS[number] | string
export type AnalyticsSubaccounts = typeof ANALYTICS_SUBACCOUNTS[number] | number

export type AnalyticsParams = {
    end?: string
    group_by?: AnalyticsGroupBy
    label?: AnalyticsLabel
    start?: string
    subaccounts?: AnalyticsSubaccounts
}

export type AnalyticsResponse = Analytic[]