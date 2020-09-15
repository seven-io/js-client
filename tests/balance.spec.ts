import client from './lib/client';
import Sms77Client from '../src/Sms77Client';

const balance: Sms77Client['balance'] = process.env.SMS77_LIVE_TEST
    ? client.balance : jest.fn(async () => 14.52);

describe('Balance', () => {
    it('should return a floating number',
        async () => expect(typeof (await balance())).toBe('number'));
});