import {v4 as uuidv4} from 'uuid';
import './lib/afterEachWait';
import {
    HooksReadParams,
    HooksReadSuccessResponse,
    HooksSubscribeErrorResponse,
    HooksSubscribeParams,
    HooksSubscribeSuccessResponse,
    HooksUnsubscribeParams,
    HooksUnsubscribeResponse
} from '../src/types';
import client from './lib/client';
import {
    hooksReadSuccessResponse,
    hooksSubscribeErrorResponse,
    hooksSubscribeSuccessResponse,
    hooksUnsubscribeSuccessResponse
} from './data/hooks';
import {HooksAction} from '../src/constants/byEndpoint/hooks/HooksAction';
import Sms77Client from '../src/Sms77Client';
import isValidURL from './lib/isValidURL';
import {HOOK_EVENT_TYPES, HOOK_REQUEST_METHODS} from '../src/constants/byEndpoint/hooks';

describe('Hooks', () => {
    let id: number;

    it('should return an object', async () => {
        const apiCall: Sms77Client['hooks'] = process.env.SMS77_LIVE_TEST
            ? client.hooks : jest.fn(async () => hooksReadSuccessResponse);

        const p: HooksReadParams = {
            action: HooksAction.Read,
        };

        const {hooks, success} = await apiCall(p) as HooksReadSuccessResponse;

        expect(success).toBe(true);

        hooks.forEach(hook => {
            expect(isNaN(Date.parse(hook.created))).toBe(false);
            expect(HOOK_EVENT_TYPES.includes(hook.event_type)).toBe(true);
            expect(Number.parseInt(hook.id)).toBeGreaterThan(0);
            expect(HOOK_REQUEST_METHODS.includes(hook.request_method)).toBe(true);
            expect(isValidURL(hook.target_url)).toBe(true);
        });
    });

    it('should fail to subscribe a webhook', async () => {
        const hooks: Sms77Client['hooks'] = process.env.SMS77_LIVE_TEST
            ? client.hooks : jest.fn(async () => hooksSubscribeErrorResponse);

        const p: HooksSubscribeParams = {
            action: HooksAction.Subscribe,
            event_type: 'dlr',
            target_url: 'abc://my.tld/123',
        };

        const res = await hooks(p) as HooksSubscribeErrorResponse;

        expect(res.success).toBe(false);
    });

    it('should subscribe a webhook', async () => {
        const hooks: Sms77Client['hooks'] = process.env.SMS77_LIVE_TEST
            ? client.hooks : jest.fn(async () => hooksSubscribeSuccessResponse);

        const p: HooksSubscribeParams = {
            action: HooksAction.Subscribe,
            event_type: 'dlr',
            request_method: 'GET',
            target_url: `https://my.tld/${uuidv4()}`,
        };

        const res = await hooks(p) as HooksSubscribeSuccessResponse;

        expect(res.success).toBe(true);
        expect(res.id).toBeGreaterThan(0);

        id = res.id;
    });

    it('should unsubscribe a webhook', async () => {
        const hooks: Sms77Client['hooks'] = process.env.SMS77_LIVE_TEST
            ? client.hooks : jest.fn(async () => hooksUnsubscribeSuccessResponse);

        const p: HooksUnsubscribeParams = {
            action: HooksAction.Unsubscribe,
            id,
        };

        expect(await hooks(p))
            .toMatchObject<HooksUnsubscribeResponse>({success: true});
    });
});