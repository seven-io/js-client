import {
    ANALYTICS_GROUPS,
    ANALYTICS_LABELS,
    ANALYTICS_SUBACCOUNTS
} from '../constants/byEndpoint/analytics';

export type AnalyticBase = {
    direct: number
    economy: number
    hlr: number
    inbound: number
    mnp: number
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
    start?: string
    end?: string
    label?: AnalyticsLabel
    subaccounts?: AnalyticsSubaccounts
    group_by?: AnalyticsGroupBy
}

export type AnalyticsResponse = Analytic[]