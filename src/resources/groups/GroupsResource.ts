import {AbstractResource} from '../AbstractResource'
import type {DeleteGroupResponse, Group} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class GroupsResource extends AbstractResource {
    async edit(id: number, group: Pick<Group, 'name'>): Promise<Group> {
        const payload = new ApiPayload(group).convert()
        return await this.client.request('patch', `groups/${id}`, payload)
    }

    async create(group: Pick<Group, 'name'>): Promise<Group> {
        return await this.client.request('post', 'groups', new ApiPayload(group).convert())
    }

    async delete(id: number, deleteContacts: boolean = false): Promise<DeleteGroupResponse> {
        const endpoint = `groups/${id}?delete_contacts=${deleteContacts}`
        return await this.client.request('delete', endpoint, (new ApiPayload).convert())
    }

    async all(): Promise<Group[]> {
        return await this.client.request('get', 'groups', (new ApiPayload).convert())
    }

    async one(id: number): Promise<Group> {
        return await this.client.request('get', `groups/${id}`, (new ApiPayload).convert())
    }
}
