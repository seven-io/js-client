import {AnalyticBase} from '../../src/types';

export const analyticsBaseMatcher: AnalyticBase = {
    sms: expect.any(Number),
    hlr: expect.any(Number),
    inbound: expect.any(Number),
    mnp: expect.any(Number),
    usage_eur: expect.any(Number),
    voice: expect.any(Number),
};