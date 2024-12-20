import {ErrorCode} from '../../../lib'

export * from './LOOKUP_GSM_CODES'
export * from './NetworkType'
export * from './ProviderName'

export const API_RESPONSE_CODES = [
    100,
    ErrorCode.InvalidRecipientNumber,
    ErrorCode.InsufficientCredits,
    ErrorCode.CarrierFailed,
] as const

export const CNAM_API_CODES = [
    ErrorCode.InvalidRecipientNumber,
    ErrorCode.CarrierFailed,
] as const

export const HLR_LOOKUP_OUTCOME_CODES = [
    1,
    2,
    0,
] as const

export const HLR_PORTED_CODES = [
    'assumed_not_ported',
    'assumed_ported',
    'not_ported',
    'ported',
    'unknown',
] as const

export const HLR_REACHABLE_CODES = [
    'absent',
    'bad_number',
    'blacklisted',
    'reachable',
    'undeliverable',
    'unknown',
] as const

export const HLR_ROAMING_CODES = ['not_roaming'] as const

export const HLR_STATUS_MESSAGE_CODES = [
    'error',
    'success',
] as const

export const HLR_VALID_NUMBER_CODES = [
    'not_valid',
    'unknown',
    'valid',
] as const

export const ROAMING_STATUS_CODES = [
    'not_roaming',
    'roaming',
    'unknown',
] as const

export const STRING_RESPONSE_CODES = [
    '100',
    ErrorCode.InvalidRecipientNumber.toString(),
    ErrorCode.InsufficientCredits.toString(),
    ErrorCode.CarrierFailed.toString(),
] as const
