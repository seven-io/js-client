import STRING_BOOLEAN_VALUES from '../../lib/StringBooleanValues'
import {
    API_RESPONSE_CODES,
    HLR_LOOKUP_OUTCOME_CODES,
    HLR_PORTED_CODES,
    HLR_REACHABLE_CODES,
    HLR_ROAMING_CODES,
    HLR_STATUS_MESSAGE_CODES,
    HLR_VALID_NUMBER_CODES,
    LOOKUP_GSM_CODES,
    NetworkType,
    ROAMING_STATUS_CODES,
} from './constants'

export type ApiResponseCode = typeof API_RESPONSE_CODES[number];
export type GsmCode = typeof LOOKUP_GSM_CODES[number]
export type StringBoolean = typeof STRING_BOOLEAN_VALUES[number];

export type Carrier = {
    country: string
    name: string
    network_code: string
    network_type: NetworkType
}

export type Format = {
    national: string
    carrier: string
    country_code: string
    country_iso: string
    country_name: string
    international: string
    international_formatted: string
    network_type: NetworkType
    success: boolean,
}

export type HLR = {
    country_code: string
    country_code_iso3?: string
    country_name: string
    country_prefix: string
    current_carrier: Carrier
    gsm_code: GsmCode
    gsm_message: string
    international_format_number: string
    international_formatted: string
    lookup_outcome: typeof HLR_LOOKUP_OUTCOME_CODES[number] | boolean
    lookup_outcome_message: string
    national_format_number: string
    original_carrier: Carrier
    ported: typeof HLR_PORTED_CODES[number]
    reachable: typeof HLR_REACHABLE_CODES[number]
    roaming: typeof HLR_ROAMING_CODES[number] | Roaming
    status: boolean
    status_message: typeof HLR_STATUS_MESSAGE_CODES[number]
    valid_number: typeof HLR_VALID_NUMBER_CODES[number]
}

export type MNP = {
    country: string
    international_formatted: string
    isPorted: boolean
    mccmnc: string
    national_format: string
    network: string
    number: string
}

export type Roaming = {
    roaming_country_code: string
    roaming_network_code: string
    roaming_network_name: string
    status: typeof ROAMING_STATUS_CODES[number]
}

export type MnpResponse = {
    code: ApiResponseCode
    mnp: MNP
    price: number
    success: boolean
}

export type LookupParams = {
    numbers: string[]
}

export type CnamResponse = {
    code: number
    name?: string
    number?: string
    success?: StringBoolean
}