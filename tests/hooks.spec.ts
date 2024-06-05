import client from './lib/client'
import {createRandomURL, isValidURL} from './lib/utils'
import {HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS, HooksResource, type HooksUnsubscribeResponse} from '../src'

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
            eventType: 'dlr',
            targetUrl: 'abc://my.tld/123', // invalid domain
        })

        expect('id' in res).toBeFalsy()
        expect(res.success).toBe(false)
    })

    it('should subscribe a webhook', async () => {
        const res = await resource.subscribe({
            eventType: 'dlr',
            requestMethod: 'GET',
            targetUrl: createRandomURL(),
        })

        if ('id' in res && res.id) {
            await resource.unsubscribe(res.id)
            expect(res.id).toBeGreaterThan(0)
        }

        expect(res.success).toBe(true)
    })

    it('should unsubscribe a webhook', async () => {
        const subscription = await resource.subscribe({eventType: 'all', targetUrl: createRandomURL()})
        const res = await resource.unsubscribe(subscription.id!)
        expect(res).toMatchObject<HooksUnsubscribeResponse>({success: expect.any(Boolean)})
    })
})
