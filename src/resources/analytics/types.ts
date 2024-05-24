import {ANALYTICS_LABELS, ANALYTICS_SUBACCOUNTS} from './constants'

export type AnalyticBase = {
    hlr: number
    inbound: number
    mnp: number
    rcs: number
    sms: number
    usage_eur: number
    voice: number
}

export type AnalyticGroupByCountry = AnalyticBase & { country: string }

export type AnalyticGroupByDate = AnalyticBase & { date: string }

export type AnalyticGroupBySubaccount = AnalyticBase & { account: string }

export type AnalyticGroupByLabel = AnalyticBase & { label: string }

export type AnalyticsParams = {
    end?: Date
    label?: typeof ANALYTICS_LABELS[number] | string
    start?: Date
    subaccounts?: typeof ANALYTICS_SUBACCOUNTS[number] | number
}
