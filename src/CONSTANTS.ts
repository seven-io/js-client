import {tuple} from './util';

export const NETWORK_TYPES = tuple(
    'fixed_line'
    , 'fixed_line_or_mobile'
    , 'mobile'
    , 'pager'
    , 'personal_number'
    , 'premium_rate'
    , 'shared_cost'
    , 'toll_free'
    , 'uan'
    , 'unknown'
    , 'voicemail'
    , 'voip'
);

export const CONTACTS_ACTIONS = tuple(
    'del'
    , 'read'
    , 'write'
);

export const LOOKUP_TYPES = tuple(
    'cname'
    , 'format'
    , 'hlr'
    , 'mnp'
);

export const PROVIDER_NAMES = tuple(
    'd1'
    , 'd2'
    , 'o2'
    , 'eplus'
    , 'N/A'
    , 'int'
);

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