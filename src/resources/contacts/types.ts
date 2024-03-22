export type Contact = { readonly [k: string]: any } & {
    readonly id: number
    readonly nick: string
    readonly number: string
    readonly email: string
}

export type ContactDeleteResponse = {
    return: number
}

export type ContactWriteResponse = {
    return: number
    id: number
}

export type ContactWriteParams = {
    email?: string
    mobile?: string
    id?: number
    nick?: string
}
