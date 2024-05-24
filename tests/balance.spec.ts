import {Balance, BalanceResource} from '../src'
import client from './lib/client'

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
