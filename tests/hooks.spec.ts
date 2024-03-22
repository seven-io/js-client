import {Hook, HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS, HooksResource, HooksUnsubscribeResponse} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {createRandomURL, isValidURL} from './lib/utils'

const resource = new HooksResource(client)

describe('Hooks', () => {
    it('should return an object', async () => {
        const apiCall: HooksResource['read'] = environment.live
            ? resource.read.bind(resource)
            : jest.fn(async () => ({
                hooks: [
                    {
                        created: new Date('2020-11-04 13:49:16'),
                        enabled: true,
                        event_filter: null,
                        event_type: 'sms_mo',
                        id: '23',
                        request_method: 'POST',
                        target_url: 'https:\/\/my.tld\/webhook',
                    } as Hook,
                ],
                success: true,
            }))

        const {hooks, success} = await apiCall()

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
        const subscribe: HooksResource['subscribe'] = environment.live
            ? resource.subscribe.bind(resource)
            : jest.fn(async () => ({success: false}))

        const res = await subscribe({
            event_type: 'dlr',
            target_url: 'abc://my.tld/123', // invalid domain
        })

        expect('id' in res).toBeFalsy()
        expect(res.success).toBe(false)
    })

    it('should subscribe a webhook', async () => {
        const hooks: HooksResource['subscribe'] = environment.live
            ? resource.subscribe.bind(resource)
            : jest.fn(async () => ({
                id: 12345,
                success: true,
            }))

        const res = await hooks({
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

    const subscribe = (): HooksResource['subscribe'] => {
        return environment.live
            ? resource.subscribe.bind(resource)
            : jest.fn(async () => ({
                id: 12345,
                success: true,
            }))
    }

    it('should unsubscribe a webhook', async () => {
        const subscription = await subscribe()({event_type: 'all', target_url: createRandomURL()})

        const unsubscribe: HooksResource['unsubscribe'] = environment.live
            ? resource.unsubscribe.bind(resource)
            : jest.fn(async () => ({success: true}))
        const res = await unsubscribe(subscription.id!)
        expect(res).toMatchObject<HooksUnsubscribeResponse>({success: expect.any(Boolean)})
    })
})
