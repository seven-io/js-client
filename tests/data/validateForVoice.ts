import {ValidateForVoiceResponse} from '../../src/types';

export const dummyValidateForVoice: ValidateForVoiceResponse = {
    code: '661951',
    error: null,
    success: true,
};

export const dummyValidateForVoiceAllKeys: ValidateForVoiceResponse = {
    ...dummyValidateForVoice,
    formatted_output:  null,
    id: null,
    sender: '',
    voice: true,
}