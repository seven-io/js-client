import client from './lib/client'
import {type Balance, BalanceResource} from '../src'

const resource = new BalanceResource(client)

describe('Balance', () => {
    it('should return an object',
        async () => {
            const res = await resource.get()
            expect(res).toMatchObject<Balance>({
                amount: expect.any(Number),
                currency: expect.any(String),
            })
        })
})
