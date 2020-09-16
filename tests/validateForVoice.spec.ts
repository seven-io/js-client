import {ValidateForVoiceResponse,} from '../src/types';
import client from './lib/client';
import Sms77Client from '../src/Sms77Client';
import {dummyValidateForVoiceAllKeys} from './data/validateForVoice';

const validateForVoice: Sms77Client['validateForVoice'] = process.env.SMS77_LIVE_TEST
    ? client.validateForVoice : jest.fn(async () => dummyValidateForVoiceAllKeys);

describe('ValidateForVoice', () => {
    it('should return a json response', async () => {
        const res = await validateForVoice({number: process.env.SMS77_RECIPIENT!});

        expect(res).not.toBeNull();


        const expected: ValidateForVoiceResponse = {
            error: expect.nilOrAny(String),
            success: expect.any(Boolean),
        };

        'code' in res && (expected.code = expect.any(String));
        'formatted_output' in res && (expected.formatted_output
            = expect.nilOrAny(String));
        'id' in res && (expected.id = expect.nilOrAny(Number));
        'sender' in res && (expected.sender = expect.any(String));
        'voice' in res && (expected.voice = expect.any(Boolean));

        expect.objectContaining<ValidateForVoiceResponse>(expected);
    });
});