import {VoiceResponse} from '../../src/types';

const code = 100;
const cost = 1.52
const id = 5136161;

export const dummmyVoiceResponseText: VoiceResponse = `${code}\n${id}\n${cost}`;

export const dummmyVoiceResponseJson: VoiceResponse = {
    code,
    cost,
    id,
}