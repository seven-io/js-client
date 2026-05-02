export type RbmAgentStatus = 'test' | 'pending' | 'launched'

export type GenericMessagingServiceStatus = 'wait' | 'approved' | 'denied'

export type RcsAgentStatus = RbmAgentStatus | GenericMessagingServiceStatus

export type RbmAgent = {
    id: string
    display_name: string
    status: RbmAgentStatus
    logo_url: string | null
    created: string
    is_generic: false
}

export type GenericMessagingService = {
    id: string
    display_name: string
    status: GenericMessagingServiceStatus
    logo_url: null
    created: string
    is_generic: true
}

export type RcsAgent = RbmAgent | GenericMessagingService

export type RcsAgentsResponse = {
    agents: RcsAgent[]
}
