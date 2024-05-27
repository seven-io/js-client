import {HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS} from './constants'

export type HookEventType = (typeof HOOK_EVENT_TYPES)[number]

export type HookRequestMethod = (typeof HOOK_REQUEST_METHODS)[number]

export type HooksSubscribeParams = {
    eventFilter?: string
    eventType: HookEventType
    requestMethod?: HookRequestMethod
    targetUrl: string
}

export type HooksReadResponse = {
    hooks?: Hook[]
    success: boolean
}

export type Hook = {
    enabled: boolean
    created: Date
    event_filter: null | string
    event_type: HookEventType
    id: string
    request_method: HookRequestMethod
    target_url: string
}

export type HooksSubscribeResponse = {
    id?: number
    success: boolean
}

export type HooksUnsubscribeResponse = {
    success: boolean
}
