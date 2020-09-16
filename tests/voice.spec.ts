import {VoiceParams, VoiceResponse, VoiceResponseJson,} from '../src/types';
import client from './lib/client';
import Sms77Client from '../src/Sms77Client';
import {dummmyVoiceResponseJson, dummmyVoiceResponseText} from './data/voice';
import TextTransformer from '../src/lib/TextTransformer';
import {voiceMatcher} from './matchers/voice';

const voice: Sms77Client['voice'] = process.env.SMS77_LIVE_TEST
    ? client.voice
    : jest.fn(async (p: VoiceParams) =>
        p._json ? dummmyVoiceResponseJson : dummmyVoiceResponseText);

const expectJson = (o: VoiceResponseJson) => expect(o)
    .toMatchObject<VoiceResponse>(voiceMatcher);

const commonParams: VoiceParams = {
    from: 'Tom Tester',
    text: 'This is a Test!',
    to: process.env.SMS77_RECIPIENT!,
    xml: false,
};

describe('Voice', () => {
    it('should return a text response', async () => {
        const text = await voice(commonParams);
        const json = TextTransformer.voice(text as string);
        expectJson(json);
    });

    it('should return a json response', async () => {
        const opts: VoiceParams = {...commonParams, _json: true};
        const json = await voice(opts) as VoiceResponseJson;
        expectJson(json);
    });
});