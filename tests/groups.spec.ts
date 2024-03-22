import client from './lib/client'
import environment from './lib/environment'
import type {ResourceMock} from './lib/utils'
import GroupsResource from '../src/resources/groups/GroupsResource';
import {DeleteGroupResponse, Group} from '../src/resources/groups/types';

jest.mock('../src', () => ({
    GroupsResource: jest.fn().mockImplementation((): ResourceMock<GroupsResource> => {
        return environment.live
            ? new GroupsResource(client)
            : {
                delete: async () => ({success: true}),
                all: async () => [
                    {
                        id: 1,
                        created: '',
                        name: 'Name',
                        members_count: 0,
                    },
                    {
                        id: 1,
                        created: '',
                        name: 'Name',
                        members_count: 0,
                    },
                ],
                create: async () => ({
                    id: 1,
                    created: '',
                    name: 'Name',
                    members_count: 0,
                }),
                one: async (id: number): Promise<Group> => ({
                    id: 1,
                    created: '',
                    name: 'Name',
                    members_count: 0,
                }),
                edit: async () => ({
                    id: 1,
                    created: '',
                    name: 'Name',
                    members_count: 0,
                })
            }
    }),
}))

const resource = new GroupsResource(client)

const groupMatcher: Group = {
    created: expect.any(String),
    id: expect.any(Number),
    members_count: expect.any(Number),
    name: expect.any(String),
}

describe('Groups', () => {
    it('should return a single group object', async () => {
        const createResponse = await resource.create({name: 'tom@test.er'})

        const group = await resource.one(createResponse.id)
        expect(group).toMatchObject(groupMatcher)
    })

    it('should create and edit a group', async () => {
        const createResponse = await resource.create({name: 'tom@test.er'})

        const group = await resource.edit(createResponse.id, {name: 'Edited Group'})
        expect(group).toMatchObject(groupMatcher)
    })

    it('should return a json list of groups',
        async () => {
            const res = await resource.all()
            expect.arrayContaining<Group>(Array(res.length).fill(groupMatcher))
        })

    it('should create a new group and delete it again', async () => {
        const createResponse = await resource.create({name: 'tom@test.er'})

        const deleteResponse = await resource.delete(createResponse.id)
        expect(deleteResponse).toMatchObject<DeleteGroupResponse>({
            success: expect.any(Boolean),
        })
    })
})
