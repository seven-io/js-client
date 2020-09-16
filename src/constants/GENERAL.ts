export const ANALYTICS_GROUPS = ['date', 'label', 'subaccount', 'country'] as const;
export const ANALYTICS_LABELS = ['all'] as const;
export const ANALYTICS_SUBACCOUNTS = ['only_main', 'all'] as const;

export const API_RESPONSE_CODES = [100, 202, 500, 600] as const;

export const STRING_BOOLEAN_VALUES = ['true', 'false',] as const;
export const STRING_RESPONSE_CODES = ['100', '202', '500', '600'] as const;

export const CNAM_API_CODES = [202, 600] as const;

export const HLR_LOOKUP_OUTCOME_CODES = [1, 2, 0] as const;
export const HLR_PORTED_CODES = ['unknown', 'ported', 'not_ported', 'assumed_not_ported', 'assumed_ported'] as const;
export const HLR_REACHABLE_CODES = ['unknown', 'reachable', 'undeliverable', 'absent', 'bad_number', 'blacklisted'] as const;
export const HLR_ROAMING_CODES = ['not_roaming',] as const;
export const HLR_STATUS_MESSAGE_CODES = ['error', 'success',] as const;
export const HLR_VALID_NUMBER_CODES = ['unknown', 'valid', 'not_valid'] as const;

export const PRICING_FORMATS = ['json', 'csv',] as const;

export const ROAMING_STATUS_CODES = ['not_roaming', 'roaming', 'unknown'] as const;

export const SMS_SIGNATURE_POSITIONS = ['append', 'prepend',] as const;
export const SMS_DEBUG_VALUES = STRING_BOOLEAN_VALUES;
export const SMS_ENCODINGS = ['gsm', 'ucs2'] as const;
export const SMS_TYPES = ['direct', 'economy',] as const;