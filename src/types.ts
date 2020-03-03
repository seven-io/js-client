import {GSM_CODES} from './constants/GSM_CODES';
import {NETWORK_TYPES} from './constants/NETWORK_TYPES';
import {CONTACTS_ACTIONS} from './constants/CONTACTS_ACTIONS';
import {LOOKUP_TYPES} from './constants/LOOKUP_TYPES';
import {PROVIDER_NAMES} from './constants/PROVIDER_NAMES';
import {STATUS_REPORT_CODES} from './constants/STATUS_REPORT_CODES';

export type GsmCode = (typeof GSM_CODES)[number]
export type NetworkType = keyof typeof NETWORK_TYPES
export type ContactsAction = keyof typeof CONTACTS_ACTIONS
export type LookupType = keyof typeof LOOKUP_TYPES
export type ProviderName = keyof typeof PROVIDER_NAMES
export type StatusDeliveryCode = keyof typeof STATUS_REPORT_CODES

export type CNAMApiCodes = 202 | 600

export type BaseApiResponse = {
    success: boolean
    code: 100 | 202 | 500 | 600
}

export type Carrier = {
    country: string
    name: string
    network_code: string
    network_type: NetworkType
}

export type Contact = {
    email: string
    id: number
    nick: string,
    number: string,
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
    country_code_iso3: string
    country_name: string
    country_prefix: string
    current_carrier: Carrier
    gsm_code: GsmCode
    gsm_message: string
    international_format_number: string
    international_formatted: string
    lookup_outcome: 1 | 2 | 0
    lookup_outcome_message: string
    national_format_number: string
    original_carrier: Carrier
    ported: 'unknown' | 'ported' | 'not_ported' | 'assumed_not_ported' | 'assumed_ported'
    reachable: 'unknown' | 'reachable' | 'undeliverable' | 'absent' | 'bad_number' | 'blacklisted'
    roaming: Roaming
    status: boolean
    status_message: 'error' | 'success'
    valid_number: 'unknown' | 'valid' | 'not_valid'
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
    status: 'not_roaming' | 'roaming' | 'unknown'
}

export type ContactsParams = {
    action: ContactsAction
    email?: string
    empfaenger?: string
    id?: number
    json?: boolean
    nick?: string
}

export type LookupParams = {
    type: LookupType
    number: string
    json?: boolean
}

export type PricingParams = {
    country?: string
    format?: 'json' | 'csv'
}

export type SmsType = 'direct' | 'economy'

export type SmsParams = {
    text: string
    to: string
    debug?: boolean
    delay?: string
    details?: boolean
    flash?: boolean
    from?: string
    label?: string
    json?: boolean
    no_reload?: boolean
    unicode?: boolean
    udh?: string
    utf8?: boolean
    ttl?: string
    type?: SmsType
    performance_tracking?: boolean
    return_msg_id?: boolean
}

export type SmsJsonResponse = {
    debug: 'true' | 'false'
    balance: number
    messages: [{
        encoding: string
        error: string | null
        error_text: string | null
        id: string,
        messages?: string[]
        parts: number
        price: number,
        recipient: string
        sender: string
        success: boolean
        text: string
    }],
    sms_type: SmsType
    success: string
    total_price: number
};

export type StatusParams = {
    msg_id: string
}

export type ValidateForVoiceParams = {
    number: string
    callback?: string
}

export type VoiceParams = {
    text: string
    to: string
    xml?: boolean
    from?: string
}

export type CNAMApiResponse = CNAMApiCodes | BaseApiResponse & {
    name: string//callerID
    number: string
}

export type ContactsResponse = Contact[] | string | number

export type HLRApiResponse = string | HLR | number | { code: string }

export type FormatApiResponse = string | Format

export type LookupResponse = string | number | FormatApiResponse | HLRApiResponse | CNAMApiResponse | MNPApiResponse

export type MNPApiResponse = ProviderName | BaseApiResponse & {
    mnp: MNP,
}

export type SmsResponse = string | SmsJsonResponse

export type CountryNetwork = {
    comment: string
    features: string[]
    mcc: string
    mncs: string[]
    networkName: string
    price: number
}

export type CountryPricing = {
    countryCode: string
    countryName: string
    countryPrefix: string
    networks: CountryNetwork[]
}

export type PricingResponse = {
    countCountries: number
    countNetworks: number
    countries: CountryPricing[]
}

export type StatusResponse = {
    report: StatusDeliveryCode
    timestamp: string
}

export type ValidateForVoiceResponse = {
    error: string
    success: boolean
    code?: string
    formatted_output?: null
    id?: null | number
    sender?: string
    voice?: boolean
}

export type VoiceResponse = {
    code: number
    cost: number
    id: number
}