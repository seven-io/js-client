export type ContactsListResponse = {
    data: Contact[]
    pagingMetadata: {
        count: number
        has_more: boolean
        limit: number
        offset: number
        total: number
    }
}

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
        fullname: string | null
        home_number: string | null
        lastname: string | null
        mobile_number: string | null
        notes: string | null
        postal_code: string | null
    }
    validation: {
        state: 'valid' | 'invalid' | 'absent' | 'unknown' | null
        timestamp: string | null
    }
}

export type ContactsCreateParams = Pick<Contact, 'avatar' | 'groups'>
    & { properties: Omit<Contact['properties'], 'fullname'> }

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
