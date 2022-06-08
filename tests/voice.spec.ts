import {VoiceParams, VoiceResponse, VoiceJsonResponse} from '../src/types';
import client from './lib/client';
import Sms77Client from '../src/Sms77Client';
import {dummmyVoiceResponseJson, dummmyVoiceResponseText} from './data/voice';
import {voiceMatcher} from './matchers/voice';
import Util from '../src/lib/Util';

const voice: Sms77Client['voice'] = process.env.SMS77_LIVE_TEST
    ? client.voice
    : jest.fn(async (p: VoiceParams) =>
        p.json ? dummmyVoiceResponseJson : dummmyVoiceResponseText);

const expectJson = (o: VoiceJsonResponse) => expect(o)
    .toMatchObject<VoiceResponse>(voiceMatcher);

const commonParams: VoiceParams = {
    debug: false,
    from: 'Tom Tester',
    text: 'This is a Test!',
    to: process.env.SMS77_RECIPIENT!,
    xml: false,
};

describe('Voice', () => {
    it('should return a text response', async () => {
        const text = await voice(commonParams) as string;
        const [code, id, cost] = Util.splitByLine(text);
        expect(code).toHaveLength(3);
        expect(Number.parseInt(id)).toBeGreaterThan(0);
        expect(Number.parseFloat(cost)).toBeGreaterThanOrEqual(0);
    });

    it('should return a json response', async () => {
        const opts: VoiceParams = {...commonParams, json: true};
        const json = await voice(opts) as VoiceJsonResponse;
        expectJson(json);
    });

    it('should return a json dummy response', async () => {
        const opts: VoiceParams = {...commonParams, debug: true, json: true};
        const json = await voice(opts) as VoiceJsonResponse;
        expectJson(json);
        expect(json.total_price).toEqual(0);
        expect(json.debug).toEqual(true);
    });
});