import {HooksAction} from '../constants/byEndpoint/hooks/HooksAction';
import {HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS} from '../constants/byEndpoint/hooks';

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
    & Omit<Hook, 'id' | 'created' | 'request_method'> & {
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
    event_type: HookEventType
    id: string
    request_method: HookRequestMethod
    target_url: string
}

export type HooksReadSuccessResponse = HooksReadResponse<true> & {
    hooks: Hook[]
}

type HooksSubscribeResponse<B extends boolean> = {
    success: B
}

export type HooksSubscribeSuccessResponse = HooksSubscribeResponse<true> & {
    id: number
}

export type HooksSubscribeErrorResponse = HooksSubscribeResponse<false>

export type HooksUnsubscribeResponse = {
    success: boolean
}