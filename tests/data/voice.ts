import {VoiceResponse} from '../../src/types';

export const dummmyVoiceResponseText: VoiceResponse = `100\n5136161\n1.52`;

export const dummmyVoiceResponseJson: VoiceResponse = {
    balance: 12.088,
    debug: true,
    messages: [
        {
            error: null,
            error_text: null,
            id: '123456789',
            price: 0,
            recipient: '491771783130',
            sender: '491771783130',
            success: true,
            text: 'HEY!'
        }
    ],
    success: '100',
    total_price: 0.55
};