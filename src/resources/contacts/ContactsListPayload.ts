import {ApiPayload} from '../../lib/ApiPayload'
import type {ContactsListParams} from './types'

export default class ContactsListPayload extends ApiPayload<ContactsListParams> {
    convert(): {
        [k: string]: any
    } {
        const {groupId, orderBy, orderDirection, ...params} = this.params

        return {
            ...params,
            group_id: groupId,
            order_by: orderBy,
            order_direction: orderDirection
        }
    }
}
