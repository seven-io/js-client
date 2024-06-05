import client from './lib/client'
import {BalanceResource} from '../src/resources'
import type {Balance} from '../src/resources/balance/types'

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
