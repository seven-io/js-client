import {ContactsAction} from '../constants/byEndpoint/contacts/ContactsAction';

export type Contact = {
    email?: string
    id?: number
    ID?: string
    Name?: string
    number?: string
    Number?: string
    nick?: string
}

export type ContactsBaseParams<A extends ContactsAction> = {
    action: A
    json?: boolean
}

export type ContactsDelParams = ContactsBaseParams<ContactsAction.Delete> & {
    id: number
}

export type ContactsReadParams = ContactsBaseParams<ContactsAction.Read> & {
    id?: number
}

export type ContactsWriteParams = ContactsBaseParams<ContactsAction.Write> & {
    email?: string
    empfaenger?: string
    id?: number
    nick?: string
}

export type ContactsParams = ContactsDelParams
    | ContactsReadParams
    | ContactsWriteParams

export type ContactsWriteResponse = {
    return: string
    id: string
}

export type ContactsResponse =
    Contact[]
    | string
    | number
    | ContactsWriteResponse