import STRING_BOOLEAN_VALUES from '../STRING_BOOLEAN_VALUES';

export const SMS_DEBUG_VALUES = STRING_BOOLEAN_VALUES;

export const SMS_ENCODINGS = [
    'gsm',
    'ucs2'
] as const;

export const SMS_SIGNATURE_POSITIONS = [
    'append',
    'prepend',
] as const;

export const SMS_TYPES = [
    'direct',
    'economy',
] as const;