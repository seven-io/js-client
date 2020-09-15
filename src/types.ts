import {GSM_CODES} from './constants/GSM_CODES';
import {NetworkType} from './constants/enums/NetworkType';
import {ContactsAction} from './constants/enums/ContactsAction';
import {LookupType} from './constants/enums/LookupType';
import {ProviderName} from './constants/enums/ProviderName';
import {StatusReportCode} from './constants/enums/StatusReportCode';
import {
    ANALYTICS_GROUPS,
    ANALYTICS_LABELS,
    ANALYTICS_SUBACCOUNTS,
    API_RESPONSE_CODES,
    CNAM_API_CODES,
    HLR_LOOKUP_OUTCOME_CODES,
    HLR_PORTED_CODES,
    HLR_REACHABLE_CODES,
    HLR_ROAMING_CODES,
    HLR_STATUS_MESSAGE_CODES,
    HLR_VALID_NUMBER_CODES,
    PRICING_FORMATS,
    ROAMING_STATUS_CODES,
    SMS_DEBUG_VALUES,
    SMS_ENCODINGS,
    SMS_SIGNATURE_POSITIONS,
    SMS_TYPES,
    STRING_BOOLEAN_VALUES,
    STRING_RESPONSE_CODES
} from './constants/GENERAL';

export type AnalyticBase = {
    direct: number
    economy: number
    hlr: number
    inbound: number
    mnp: number
    usage_eur: number
    voice: number
}

export type AnalyticGroupByCountry = AnalyticBase & { country: string }
export type AnalyticGroupByDate = AnalyticBase & { date: string }
export type AnalyticGroupBySubaccount = AnalyticBase & { account: string }
export type AnalyticGroupByLabel = AnalyticBase & { label: string }
export type Analytic = AnalyticGroupByCountry
    | AnalyticGroupByDate
    | AnalyticGroupBySubaccount
    | AnalyticGroupByLabel
export type AnalyticsGroupBy = typeof ANALYTICS_GROUPS[number]
export type AnalyticsLabel = typeof ANALYTICS_LABELS[number] | string
export type AnalyticsSubaccounts = typeof ANALYTICS_SUBACCOUNTS[number] | number

export type AnalyticsParams = {
    start?: string
    end?: string
    label?: AnalyticsLabel
    subaccounts?: AnalyticsSubaccounts
    group_by?: AnalyticsGroupBy
}

export type AnalyticsResponse = Analytic[]

export type GsmCode = typeof GSM_CODES[number]

export type CNAMApiCodes = typeof CNAM_API_CODES[number]

export type ApiResponseCode = typeof API_RESPONSE_CODES[number];

export type StringBoolean = typeof STRING_BOOLEAN_VALUES[number];
export type StringResponseCode = typeof STRING_RESPONSE_CODES[number];

export type Carrier = {
    country: string
    name: string
    network_code: string
    network_type: NetworkType
}

export type Contact = {
    email?: string
    id?: number
    ID?: string
    Name?: string
    number?: string
    Number?: string
    nick?: string
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

export type ContactsParams = {
    action: ContactsAction
    email?: string
    empfaenger?: string
    id?: number
    json?: boolean
    nick?: string
}

type BaseLookupParams<T extends LookupType> = {
    type: T
    number: string
}
export type LookupCnamParams = BaseLookupParams<LookupType.Cnam>
export type LookupFormatParams = BaseLookupParams<LookupType.Format>
export type LookupHlrParams = BaseLookupParams<LookupType.Hlr>
export type LookupMnpParams = BaseLookupParams<LookupType.Mnp> & {
    json?: boolean
}
export type LookupParams =
    LookupCnamParams
    | LookupFormatParams
    | LookupHlrParams
    | LookupMnpParams

export type PricingParams = {
    country?: string
    format?: typeof PRICING_FORMATS[number]
}

export type SmsMessage = {
    encoding: typeof SMS_ENCODINGS[number]
    error: string | null
    error_text: string | null
    id: string | null
    messages?: string[]
    parts: number
    price: number,
    recipient: string
    sender: string
    success: boolean
    text: string
};

export type SmsType = typeof SMS_TYPES[number]

export type SmsParams = {
    _extras?: {
        signature?: string
        signaturePosition?: AddSignatureOpts['position']
    }
    debug?: boolean
    delay?: string
    details?: boolean
    flash?: boolean
    foreign_id?: string
    from?: string
    label?: string
    json?: boolean
    no_reload?: boolean
    text: string
    to: string
    unicode?: boolean
    udh?: string
    utf8?: boolean
    ttl?: number
    performance_tracking?: boolean
    return_msg_id?: boolean
}

export type SmsJsonResponse = {
    debug: typeof SMS_DEBUG_VALUES[number]
    balance: number
    messages: SmsMessage[],
    sms_type: SmsType
    success: string
    total_price: number
};

export type StatusParams = {
    _json?: boolean
    msg_id: string
}

export type ValidateForVoiceParams = {
    number: string
    callback?: string
}

export type VoiceParams = {
    _json?: boolean
    text: string
    to: string
    xml?: boolean
    from?: string
}

export type CNAMApiJsonResponse = {
    code: StringResponseCode
    name: string // callerID
    number: string
    success: StringBoolean
}

export type CNAMApiResponse = CNAMApiCodes | CNAMApiJsonResponse

export type ContactsWriteResponse = {
    return: string
    id: string
}

export type ContactsResponse =
    Contact[]
    | string
    | number
    | ContactsWriteResponse

export type HLRApiResponse = string | HLR | number | { code: string }

export type FormatApiResponse = string | Format

export type LookupResponse =
    string
    | number
    | FormatApiResponse
    | HLRApiResponse
    | CNAMApiResponse
    | MNPApiResponse

export type MNPApiJsonResponse = {
    code: ApiResponseCode
    mnp: MNP
    price: number
    success: boolean
}

export type MNPApiResponse = ProviderName | MNPApiJsonResponse

export type SmsResponse = number | string | SmsJsonResponse

export type CountryNetwork = {
    comment: string
    features: string[]
    mcc: string
    mncs: string[]
    networkName: string
    price: number
}

export type CsvNetwork = CountryNetwork & Omit<CountryPricing, 'networks'>

export type CountryPricing = {
    countryCode: string
    countryName: string
    countryPrefix: string
    networks: CountryNetwork[]
}

export type PricingResponse = PricingResponseJson | string

export type PricingResponseJson = {
    countCountries: number
    countNetworks: number
    countries: CountryPricing[]
}

export type StatusResponseJson = {
    report: StatusReportCode
    timestamp: string
}

export type StatusResponse = string | StatusResponseJson

export type ValidateForVoiceResponse = {
    code?: string
    error: string | null
    formatted_output?: string | null
    id?: number | null
    sender?: string
    success: boolean
    voice?: boolean
}

export type VoiceResponseJson = {
    code: number
    cost: number
    id: number
}

export type VoiceResponse = string | VoiceResponseJson

export type AddSignatureOpts = {
    position: typeof SMS_SIGNATURE_POSITIONS[number]
    signature: string
    text: string
}