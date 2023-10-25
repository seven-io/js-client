import type {
    AnalyticsParams,
    AnalyticsResponse,
    ContactsParams,
    ContactsResponse,
    HooksParams,
    HooksResponse,
    JournalParams,
    JournalResponse,
    LookupParams,
    LookupResponse,
    PricingParams,
    PricingResponse,
    SmsDeleteParams,
    SmsDeleteResponse,
    SmsParams,
    SmsResponse,
    StatusParams,
    StatusResponse,
    Subaccount,
    SubaccountsAutoChargeParams,
    SubaccountsAutoChargeResponse,
    SubaccountsCreateParams,
    SubaccountsCreateResponse,
    SubaccountsDeleteParams,
    SubaccountsDeleteResponse,
    SubaccountsApiParams,
    SubaccountsTransferCreditsParams,
    SubaccountsTransferCreditsResponse,
    SubaccountsAction,
    SubaccountsResponse,
    ValidateForVoiceParams,
    ValidateForVoiceResponse,
    VoiceParams,
    VoiceResponse,
} from './types'
import {BaseClient} from './BaseClient'
import {Endpoint} from './constants/Endpoint'
import TextTransformer from './lib/TextTransformer'
import {ContactsAction} from './constants/byEndpoint/contacts/ContactsAction'
import {ContactsResponseCode} from './constants/byEndpoint/contacts/ContactsResponseCode'

export * from './types'

export class Sms77Client extends BaseClient {
    analytics = async (p?: AnalyticsParams): Promise<AnalyticsResponse> =>
        (await this.get<AnalyticsResponse>(Endpoint.Analytics, p) as AnalyticsResponse)

    balance = async (): Promise<number> =>
        Number.parseFloat(await this.get<string>(Endpoint.Balance, {}))

    contacts = async (p: ContactsParams): Promise<ContactsResponse> => {
        const method = ContactsAction.Delete === p.action ? this.post : this.get
        const res = await method<ContactsResponse>(Endpoint.Contacts, p)

        if (Array.isArray(res)) return res

        if (typeof res === 'object' &&
            Object.values(ContactsResponseCode).includes(Number.parseInt(res.return))) {
            if (res.id) return Number.parseInt(res.id)

            if (undefined !== p.id) return p.id
        }

        return res
    }

    deleteSMS = async (p: SmsDeleteParams): Promise<SmsDeleteResponse> =>
        await this.delete(Endpoint.Sms, p, true) as SmsDeleteResponse

    hooks = async (p: HooksParams): Promise<HooksResponse> =>
        await this.post<HooksResponse>(Endpoint.Hooks, p) as HooksResponse

    journal = async (p: JournalParams): Promise<JournalResponse> =>
        await this.get<JournalResponse>(Endpoint.Journal, p) as JournalResponse

    lookup = async (p: LookupParams): Promise<LookupResponse> =>
        await this.post<LookupResponse>(Endpoint.Lookup, p)

    pricing = async (p?: PricingParams): Promise<PricingResponse> =>
        await this.post<PricingResponse>(Endpoint.Pricing, p)

    sms = async (p: SmsParams): Promise<SmsResponse> => await this.post(Endpoint.Sms, p)

    status = async (p: StatusParams): Promise<StatusResponse> => {
        const res = await this.get<string>(Endpoint.Status, p)

        return p._json ? TextTransformer.status(res) : res
    }

    subaccounts = {
        _dynamic: async <TAction extends SubaccountsAction, TData, TRes extends SubaccountsResponse>(
            p: SubaccountsApiParams<TAction, TData>,
        ): Promise<TRes> => {
            switch (p.action) {
                case 'read':
                    return await this.subaccounts.read() as TRes
                case 'create':
                    return await this.subaccounts
                        .create(p as unknown as SubaccountsCreateParams) as TRes
                case 'delete':
                    return await this.subaccounts
                        .delete(p as unknown as SubaccountsDeleteParams) as TRes
                case 'update':
                    return await this.subaccounts
                        .autoCharge(p as unknown as SubaccountsAutoChargeParams) as TRes
                case 'transfer_credits':
                    return await this.subaccounts
                        .transferCredits(p as unknown as SubaccountsTransferCreditsParams) as TRes
            }

            throw new Error(`Invalid action ${p.action}`)
        },
        read: async (): Promise<Subaccount[]> => {
            const params: SubaccountsApiParams<'read', {}> = {
                action: 'read',
            }
            return await this.get(Endpoint.Subaccounts, params) as Subaccount[]
        },
        create: async (p: SubaccountsCreateParams): Promise<SubaccountsCreateResponse> => {
            const params: SubaccountsApiParams<'create', SubaccountsCreateParams> = {
                action: 'create',
                ...p,
            }
            return await this.post(Endpoint.Subaccounts, params) as SubaccountsCreateResponse
        },
        delete: async (p: SubaccountsDeleteParams): Promise<SubaccountsDeleteResponse> => {
            const params: SubaccountsApiParams<'delete', SubaccountsDeleteParams> = {
                action: 'delete',
                ...p,
            }
            return await this.post(Endpoint.Subaccounts, params) as SubaccountsDeleteResponse
        },
        transferCredits: async (p: SubaccountsTransferCreditsParams): Promise<SubaccountsTransferCreditsResponse> => {
            const params: SubaccountsApiParams<'transfer_credits', SubaccountsTransferCreditsParams> = {
                action: 'transfer_credits',
                ...p,
            }
            return await this.post(Endpoint.Subaccounts, params) as SubaccountsTransferCreditsResponse
        },
        autoCharge: async (p: SubaccountsAutoChargeParams): Promise<SubaccountsAutoChargeResponse> => {
            const params: SubaccountsApiParams<'update', SubaccountsAutoChargeParams> = {
                action: 'update',
                ...p,
            }
            return await this.post(Endpoint.Subaccounts, params) as SubaccountsAutoChargeResponse
        },
    }

    validateForVoice = async (p: ValidateForVoiceParams):
        Promise<ValidateForVoiceResponse> =>
        (await this.post<ValidateForVoiceResponse>
        (Endpoint.ValidateForVoice, p) as ValidateForVoiceResponse)

    voice = async (p: VoiceParams): Promise<VoiceResponse> =>
        await this.post<string>(Endpoint.Voice, p)
}

export default Sms77Client
