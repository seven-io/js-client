import {StatusReportCode} from './StatusReportCode'

export type StatusResponse = {
    id: number
    status: StatusReportCode
    statusTime: string
}