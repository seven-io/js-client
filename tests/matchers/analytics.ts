import {AnalyticBase} from '../../src/types';

export const analyticsBaseMatcher: AnalyticBase = {
    direct: expect.any(Number),
    economy: expect.any(Number),
    hlr: expect.any(Number),
    inbound: expect.any(Number),
    mnp: expect.any(Number),
    usage_eur: expect.any(Number),
    voice: expect.any(Number),
};