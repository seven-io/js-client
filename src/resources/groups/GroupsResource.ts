import {Endpoint} from '../../lib'
import {AbstractResource} from '../AbstractResource'
import {DeleteGroupResponse, Group} from './types'
import emptyPayload from '../../EmptyPayload';
import GroupPayload from './GroupPayload';

export default class GroupsResource extends AbstractResource {
    get endpoint(): Endpoint {
        return Endpoint.Groups
    }

    async edit(id: number, group: Pick<Group, 'name'>): Promise<Group> {
        return await this.client.request('patch', `${this.endpoint}/${id}`, new GroupPayload(group))
    }

    async create(group: Pick<Group, 'name'>): Promise<Group> {
        return await this.client.request('post', this.endpoint, new GroupPayload(group))
    }

    async delete(id: number, deleteContacts: boolean = false): Promise<DeleteGroupResponse> {
        const endpoint = `${this.endpoint}/${id}?delete_contacts=${deleteContacts}`
        return await this.client.request('delete', endpoint, emptyPayload)
    }

    async all(): Promise<Group[]> {
        return await this.client.request('get', this.endpoint, emptyPayload)
    }

    async one(id: number): Promise<Group> {
        return await this.client.request('get', `${this.endpoint}/${id}`, emptyPayload)
    }
}
