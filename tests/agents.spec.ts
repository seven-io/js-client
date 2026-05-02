import client from './lib/client'
import {AgentsResource, type RcsAgent} from '../src'

const resource = new AgentsResource(client)

describe('Agents', () => {
    it('should list all RCS agents', async () => {
        const res = await resource.all()
        expect(res.agents).toBeInstanceOf(Array)

        res.agents.forEach((agent: RcsAgent) => {
            expect(agent).toMatchObject({
                id: expect.any(String),
                display_name: expect.any(String),
                status: expect.any(String),
                logo_url: expect.nilOrAny(String),
                created: expect.any(String),
                is_generic: expect.any(Boolean),
            })

            if (agent.is_generic) {
                expect(['wait', 'approved', 'denied']).toContain(agent.status)
                expect(agent.logo_url).toBeNull()
            } else {
                expect(['test', 'pending', 'launched']).toContain(agent.status)
            }
        })
    })
})
