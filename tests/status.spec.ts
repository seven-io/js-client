import {dummyStatusJson, dummyStatusText} from './data/status';
import Sms77Client, {
    StatusParams,
    StatusResponseJson
} from '../src/Sms77Client';
import Client from './lib/client';
import unionMatcher from './lib/unionMatcher';
import getStringEnumValues from './lib/getStringEnumValues';
import {StatusReportCode} from '../src/constants/enums/StatusReportCode';
import TextTransformer from '../src/lib/TextTransformer';

const status: Sms77Client['status'] = process.env.SMS77_LIVE_TEST
    ? Client.status
    : jest.fn(async (p: StatusParams) =>
        p._json ? dummyStatusJson : dummyStatusText);

const requiredParams: StatusParams = {msg_id: process.env.SMS77_MSG_ID!};

const expectJson = (json: StatusResponseJson) => expect(json)
    .toMatchObject<StatusResponseJson>({
        report: expect.stringMatching(
            unionMatcher(getStringEnumValues(StatusReportCode))),
        timestamp: expect.any(String),
    });

describe('Status', () => {
    it('should have process.env.SMS77_MSG_ID set', () =>
        expect(typeof process.env.SMS77_MSG_ID).toBe('string'));

    it('should return a text response', async () => {
        const text = await status(requiredParams);
        const json = TextTransformer.status(text as string);
        expectJson(json);
    });

    it('should return a json response', async () => {
        const json = await status({...requiredParams, _json: true});
        expectJson(json as StatusResponseJson);
    });
});