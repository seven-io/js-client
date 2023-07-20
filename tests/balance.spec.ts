import SevenClient from '../src/SevenClient'
import client from './lib/client'

const balance: SevenClient['balance'] = process.env.SEVEN_LIVE_TEST
    ? client.balance : jest.fn(async () => 14.52)

describe('Balance', () => {
    it('should return a floating number',
        async () => expect(typeof (await balance())).toBe('number'))
})
