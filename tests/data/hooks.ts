import {
    HooksReadSuccessResponse, HooksSubscribeErrorResponse,
    HooksSubscribeSuccessResponse,
    HooksUnsubscribeResponse
} from '../../src/types';

export const hooksReadSuccessResponse: HooksReadSuccessResponse = {
    hooks: [{
        created: '2020-11-04 13:49:16',
        event_type: 'sms_mo',
        id: '23',
        request_method: 'POST',
        target_url: 'https:\/\/my.tld\/webhook',
    }],
    success: true,
};

export const hooksSubscribeSuccessResponse: HooksSubscribeSuccessResponse = {
    id: 12345,
    success: true,
};

export const hooksSubscribeErrorResponse: HooksSubscribeErrorResponse = {
    success: false,
};

export const hooksUnsubscribeSuccessResponse: HooksUnsubscribeResponse = {
    success: true,
};

export const hooksUnsubscribeErrorResponse: HooksUnsubscribeResponse = {
    success: false,
};