import {HooksAction} from '../constants/byEndpoint/hooks/HooksAction'
import {HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS} from '../constants/byEndpoint/hooks'
import {StatusReportCode} from '../constants/byEndpoint/status/StatusReportCode'

type HooksBaseParams<A extends HooksAction> = {
    action: A
}

export type HooksParams = HooksReadParams
    | HooksSubscribeParams
    | HooksUnsubscribeParams

export type HooksReadParams = HooksBaseParams<HooksAction.Read>

export type HookEventType = (typeof HOOK_EVENT_TYPES)[number]

export type HookRequestMethod = (typeof HOOK_REQUEST_METHODS)[number]

export type HooksSubscribeParams = HooksBaseParams<HooksAction.Subscribe>
    & Omit<Hook, 'id' | 'created' | 'request_method' | 'event_filter'> & {
    event_filter?: string | null
    request_method?: HookRequestMethod
}

export type HooksUnsubscribeParams =
    HooksBaseParams<HooksAction.Unsubscribe> & {
    id: number
}

export type HooksResponse = HooksReadSuccessResponse
    | HooksReadResponse<false>
    | HooksSubscribeSuccessResponse
    | HooksSubscribeErrorResponse
    | HooksUnsubscribeResponse

type HooksReadResponse<B extends boolean> = {
    success: B
}

export type Hook = {
    created: string
    event_filter: null | string
    event_type: HookEventType
    id: string
    request_method: HookRequestMethod
    target_url: string
}

export type HooksReadSuccessResponse = HooksReadResponse<true> & {
    hooks: Hook[]
}

export type HooksSubscribeSuccessResponse = {
    id: number
    success: true
}

export type HooksSubscribeErrorResponse = {
    success: false
}

export type HooksUnsubscribeResponse = {
    success: boolean
}

export type HookAllPayloadEvent = 'dlr' | 'sms_mo' | 'tracking' | 'voice_status'

export type HookAllJsonPayloadBase<Event extends HookAllPayloadEvent, Data extends { [k: string]: any }>
    = Data & {
    webhook_event: Event
    webhook_timestamp: string
}

export type HookAllPayloadBase<Event extends HookAllPayloadEvent, Data extends { [k: string]: any }>
    = {
    data: Data
    webhook_event: Event
    webhook_timestamp: string
}

export type HookAllPayloadInboundSms = HookAllPayloadBase<'sms_mo', {
    id: number
    sender: string
    system: string
    text: string
    time: number
}>

export type HookAllPayloadSmsStatus = HookAllPayloadBase<'dlr', {
    msg_id: string
    status: StatusReportCode
    timestamp: string
}>

export type HookAllPayloadVoiceStatus = HookAllPayloadBase<'voice_status', {
    callerId: string
    duration: string
    id: string
    pricePerMinute: number
    recipient: string
    status: 'completed' | string // TODO: add more statuses
    timestamp: number
}>

export type HookAllPayloadTracking = HookAllPayloadBase<'tracking', {
    final_url: string
    sms_id: string
    sms_label: string
    total_clicks: number
    total_views: string
    tracking_url: string
    type: 'click' | 'view'
}>
