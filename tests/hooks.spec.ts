import {HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS, HooksResource, HooksUnsubscribeResponse} from '../src'
import client from './lib/client'
import {createRandomURL, isValidURL} from './lib/utils'

const resource = new HooksResource(client)

describe('Hooks', () => {
    it('should return an object', async () => {
        const {hooks, success} = await resource.read()

        if (success) {
            expect(hooks).toBeDefined()

            hooks!.forEach(h => {
                expect(h).toHaveProperty('created')
                expect(h).toHaveProperty('enabled')
                expect(HOOK_EVENT_TYPES.includes(h.event_type)).toBe(true)
                expect(Number.parseInt(h.id)).toBeGreaterThan(0)
                expect(HOOK_REQUEST_METHODS.includes(h.request_method)).toBe(true)
                expect(isValidURL(h.target_url)).toBe(true)
            })
        } else expect(hooks).toBeUndefined()
    })

    it('should fail to subscribe a webhook', async () => {
        const res = await resource.subscribe({
            event_type: 'dlr',
            target_url: 'abc://my.tld/123', // invalid domain
        })

        expect('id' in res).toBeFalsy()
        expect(res.success).toBe(false)
    })

    it('should subscribe a webhook', async () => {
        const res = await resource.subscribe({
            event_type: 'dlr',
            request_method: 'GET',
            target_url: createRandomURL(),
        })

        if ('id' in res && res.id) {
            await resource.unsubscribe(res.id)
            expect(res.id).toBeGreaterThan(0)
        }

        expect(res.success).toBe(true)
    })

    it('should unsubscribe a webhook', async () => {
        const subscription = await resource.subscribe({event_type: 'all', target_url: createRandomURL()})
        const res = await resource.unsubscribe(subscription.id!)
        expect(res).toMatchObject<HooksUnsubscribeResponse>({success: expect.any(Boolean)})
    })
})
