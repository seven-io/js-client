import {SmsJsonResponse} from '../../src/types';
import unionMatcher from '../lib/unionMatcher';
import {SMS_DEBUG_VALUES, SMS_TYPES} from '../../src/constants/byEndpoint/sms';

export const smsMatcher = (res: SmsJsonResponse) => ({
    balance: expect.any(Number),
    debug: expect.stringMatching(unionMatcher(SMS_DEBUG_VALUES)),
    messages: expect.arrayContaining(Array(res.messages.length).fill(expect.objectContaining({
        encoding: expect.any(String),
        error: expect.nilOrAny(String),
        error_text: expect.nilOrAny(String),
        id: expect.nilOrAny(String),
        messages: expect.nilOrAny(Array),
        parts: expect.any(Number),
        price: expect.any(Number),
        recipient: expect.any(String),
        sender: expect.any(String),
        success: expect.any(Boolean),
        text: expect.any(String),
    }))),
    sms_type: expect.any(unionMatcher(SMS_TYPES)),
    success: expect.any(String),
    total_price: expect.any(Number),
});