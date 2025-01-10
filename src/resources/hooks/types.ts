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

export type HookRcsStatusPayload = {
    agent_id: string
    sender: string
    status: 'IS_TYPING' | 'READ' | 'DELIVERED'
    foreign_id: string | null
    msg_id: string
    timestamp: string
}

export type HookRcsTextPayload = {
    agent_id: string
    content_type: 'text'
    foreign_id?: string
    id: number
    message_type: 'RCS'
    sender: string
    text: string
    time: number
}

export type HookRcsSuggestionResponsePayload = {
    agent_id: string
    content_type: 'suggestion_response'
    id: number
    message_type: 'RCS'
    sender: string
    suggestion_response: {
        postbackData: string
        text: string
        type: 'REPLY'
    }
    time: number
}

export type HookRcsUserFilePayload = {
    agent_id: string
    content_type: 'user_file'
    id: number
    message_type: 'RCS'
    sender: string
    time: number
    user_file: {
        payload: {
            fileName: string
            fileSizeBytes: number
            fileUri: string
            mimeType: string
        }
    },
}

export type HookRcsUserFileImagePayload = {
    agent_id: string
    content_type: 'user_file'
    id: number
    message_type: 'RCS'
    sender: string
    time: number
    user_file: {
        payload: {
            fileName: string
            fileSizeBytes: number
            fileUri: string
            mimeType: string
        }
        thumbnail: {
            fileSizeBytes: number
            fileUri: string
            mimeType: string
        }
    }
}

export type HookRcsLocationPayload = {
    agent_id: string
    content_type: 'location'
    id: number
    location: {
        latitude: number
        longitude: number
    },
    message_type: 'RCS'
    sender: string
    time: number
}

export type HookRcsPayload = HookRcsStatusPayload | HookRcsTextPayload | HookRcsSuggestionResponsePayload
    | HookRcsUserFilePayload | HookRcsUserFileImagePayload | HookRcsLocationPayload

export function isHookRcsTextMessage(hook: HookRcsPayload): hook is HookRcsTextPayload {
    return (hook as HookRcsTextPayload).message_type === 'RCS' && (hook as HookRcsTextPayload).content_type === 'text'
}

export function isHookRcsFileMessage(hook: HookRcsPayload): hook is HookRcsUserFilePayload {
    return (hook as HookRcsUserFilePayload).user_file !== undefined
        && !('thumbnail' in (hook as HookRcsUserFilePayload).user_file)
}

export function isHookRcsImageMessage(hook: HookRcsPayload): hook is HookRcsUserFileImagePayload {
    return (hook as HookRcsUserFileImagePayload).user_file !== undefined
        && (hook as HookRcsUserFileImagePayload).user_file.thumbnail !== undefined
}

export function isHookRcsStatusUpdate(hook: HookRcsPayload): hook is HookRcsStatusPayload {
    return (hook as HookRcsStatusPayload).status !== undefined
}

export function isHookRcsLocation(hook: HookRcsPayload): hook is HookRcsLocationPayload {
    return (hook as HookRcsLocationPayload).location !== undefined
}