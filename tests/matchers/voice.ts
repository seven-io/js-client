import {VoiceResponseJson} from '../../src/types';

export const voiceMatcher: VoiceResponseJson = {
    code: expect.any(Number),
    cost: expect.any(Number),
    id: expect.any(Number),
}