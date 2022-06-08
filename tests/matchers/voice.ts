import {VoiceJsonMessage, VoiceJsonResponse} from '../../src/types';

export const voiceMatcher: VoiceJsonResponse = {
    balance: expect.any(Number),
    debug: expect.any(Boolean),
    messages: expect.arrayContaining<VoiceJsonMessage>([
        {
            error: expect.nilOrAny(String),
            error_text: expect.nilOrAny(String),
            id: expect.any(String),
            price: expect.any(Number),
            recipient: expect.any(String),
            sender: expect.any(String),
            success: expect.any(Boolean),
            text: expect.any(String),
        }
    ]),
    success: expect.any(String),
    total_price: expect.any(Number),
};