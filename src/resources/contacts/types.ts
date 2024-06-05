export type Contact = {
    avatar: string
    created: string
    groups: number[]
    id: number
    initials: {
        color: string
        initials: string
    }
    properties: { [k: string]: any } & {
        address: string | null
        birthday: string | null
        city: string | null
        email: string | null
        firstname: string | null
        home_number: string | null
        lastname: string | null
        mobile_number: string | null
        notes: string | null
        postal_code: string | null
    }
    validation: {
        state: string | null
        timestamp: string | null
    }
}

export type ContactsListParams = {
    groupId?: number
    limit?: number
    offset?: number
    orderBy?: string
    orderDirection?: string
    search?: string
}

export type ContactsDeleteResponse = {
    success: boolean
}
