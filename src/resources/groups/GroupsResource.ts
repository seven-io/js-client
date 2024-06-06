import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import {DeleteGroupResponse, Group} from './types'
import {ApiPayload} from '../../lib/ApiPayload'

export default class GroupsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Groups
    }

    async edit(id: number, group: Pick<Group, 'name'>): Promise<Group> {
        const payload = new ApiPayload(group).convert()
        return await this.client.request('patch', `${this.endpoint}/${id}`, payload)
    }

    async create(group: Pick<Group, 'name'>): Promise<Group> {
        return await this.client.request('post', this.endpoint, new ApiPayload(group).convert())
    }

    async delete(id: number, deleteContacts: boolean = false): Promise<DeleteGroupResponse> {
        const endpoint = `${this.endpoint}/${id}?delete_contacts=${deleteContacts}`
        return await this.client.request('delete', endpoint, (new ApiPayload).convert())
    }

    async all(): Promise<Group[]> {
        return await this.client.request('get', this.endpoint, (new ApiPayload).convert())
    }

    async one(id: number): Promise<Group> {
        return await this.client.request('get', `${this.endpoint}/${id}`, (new ApiPayload).convert())
    }
}
