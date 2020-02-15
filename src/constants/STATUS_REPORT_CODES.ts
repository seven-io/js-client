import {tuple} from "../util";

export const STATUS_REPORT_CODES = tuple(
    'DELIVERED'
    , 'NOTDELIVERED'
    , 'BUFFERED'
    , 'TRANSMITTED'
    , 'ACCEPTED'
    , 'EXPIRED'
    , 'REJECTED'
    , 'FAILED'
    , 'UNKNOWN'
);