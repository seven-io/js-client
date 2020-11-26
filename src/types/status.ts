import {StatusReportCode} from '../constants/byEndpoint/status/StatusReportCode';

export type StatusResponseJson = {
    report: StatusReportCode
    timestamp: string
}

export type StatusParams = {
    _json?: boolean
    msg_id: string
}

export type StatusResponse = string | StatusResponseJson