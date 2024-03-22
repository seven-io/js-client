import {Balance, BalanceResource} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

jest.mock('../src', () => ({
    BalanceResource: jest.fn().mockImplementation((): ResourceMock<BalanceResource> => {
        return environment.live
            ? new BalanceResource(client)
            : {
                json: async () => ({
                    amount: 12.45,
                    currency: 'EUR',
                }),
            }
    }),
}))

const resource = new BalanceResource(client)

describe('Balance', () => {
    it('should return an object',
        async () => {
            const res = await resource.json()
            expect(res).toMatchObject<Balance>({
                amount: expect.any(Number),
                currency: expect.any(String),
            })
        })
})
