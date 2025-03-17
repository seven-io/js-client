import {ApiPayload} from '../../lib/ApiPayload'
import type {ContactsListParams} from './types'

export default class ContactsListPayload extends ApiPayload<ContactsListParams> {
    convert(): {
        [k: string]: any
    } {
        const {groupId, orderBy, orderDirection, limit, offset, search} = this.params

        const obj: Record<string, any> = {}

        if (Number.isInteger(groupId)) obj['group_id'] = groupId
        if (orderBy) obj['order_by'] = orderBy
        if (orderDirection) obj['order_direction'] = orderDirection
        if (Number.isInteger(limit)) obj['limit'] = limit
        if (Number.isInteger(offset)) obj['offset'] = offset
        if (search) obj['search'] = search

        return obj
    }
}
