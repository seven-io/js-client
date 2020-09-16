import './lib/afterEachWait';
import {Analytic, AnalyticsParams,} from '../src/types';
import client from './lib/client';
import {analyticsBaseMatcher} from './matchers/analytics';
import Sms77Client from '../src/Sms77Client';
import {
    dummyAnalyticsGroupedByCountry,
    dummyAnalyticsGroupedByDate,
    dummyAnalyticsGroupedByLabel,
    dummyAnalyticsGroupedBySubaccount
} from './data/analytics';

const analytics: Sms77Client['analytics'] = process.env.SMS77_LIVE_TEST
    ? client.analytics : jest.fn(async (p?: AnalyticsParams) => {
        switch (p && p.group_by || null) {
            case 'country':
                return dummyAnalyticsGroupedByCountry;
            case 'label':
                return dummyAnalyticsGroupedByLabel;
            case 'subaccount':
                return dummyAnalyticsGroupedBySubaccount;
            default:
                return dummyAnalyticsGroupedByDate;
        }
    });

const assertResponse =
    async ({group_by = 'date', ...params}: AnalyticsParams): Promise<void> => {
        const key = 'subaccount' === group_by ? 'account' : group_by;
        const res = await analytics({...params, group_by});
        const expected = {...analyticsBaseMatcher, [key]: expect.any(String)};

        expect.arrayContaining<Analytic>(Array((res).length).fill(expected));
    };

describe('Analytics', () => {
    it('should return an array of analytics grouped by date',
        async () => await assertResponse({}));

    it('should return an array of analytics grouped by country',
        async () => await assertResponse({group_by: 'country'}));

    it('should return an array of analytics grouped by label',
        async () => await assertResponse({group_by: 'label'}));

    it('should return an array of analytics grouped by subaccount',
        async () => await assertResponse({group_by: 'subaccount'}));

    it('should return an array of analytics for all subaccounts',
        async () => await assertResponse({subaccounts: 'all'}));

    it('should return an array of analytics for messages with empty label',
        async () => await assertResponse({label: ''}));

    it('should return an array of analytics for messages within timeframe',
        async () => await assertResponse({
            end: '2020-08-30',
            start: '2020-08-01',
        }));
});