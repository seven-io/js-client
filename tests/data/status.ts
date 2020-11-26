import {StatusReportCode} from '../../src/constants/byEndpoint/status/StatusReportCode';
import {StatusResponse} from '../../src/types';

const report = StatusReportCode.Delivered;
const timestamp = '2020-09-15 21:26:14.777';

export const dummyStatusText = `${report}\n${timestamp}`;

export const dummyStatusJson: StatusResponse = {
    report,
    timestamp,
};