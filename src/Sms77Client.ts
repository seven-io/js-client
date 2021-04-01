import {
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
    SmsParams,
    SmsResponse,
    StatusParams,
    StatusResponse,
    ValidateForVoiceParams,
    ValidateForVoiceResponse,
    VoiceParams,
    VoiceResponse,
} from './types';
import {BaseClient} from './BaseClient';
import {Endpoint} from './constants/Endpoint';
import TextTransformer from './lib/TextTransformer';
import {ContactsAction} from './constants/byEndpoint/contacts/ContactsAction';
import {ContactsResponseCode} from './constants/byEndpoint/contacts/ContactsResponseCode';

export * from './types';

export default class Sms77Client extends BaseClient {
    analytics = async (p?: AnalyticsParams): Promise<AnalyticsResponse> =>
        (await this.get<AnalyticsResponse>(Endpoint.Analytics, p) as AnalyticsResponse);

    balance = async (): Promise<number> =>
        Number.parseFloat(await this.get<string>(Endpoint.Balance, {}));

    contacts = async (p: ContactsParams): Promise<ContactsResponse> => {
        const args: [Endpoint, ContactsParams] = [
            Endpoint.Contacts,
            p
        ];
        const method = ContactsAction.Delete === p.action ? this.post : this.get;
        const res = await method<ContactsResponse>(...args);

        if (Array.isArray(res)) {
            return res;
        }

        if (typeof res === 'object' &&
            Object.values(ContactsResponseCode).includes(Number.parseInt(res.return))) {
            if (res.id) {
                return Number.parseInt(res.id);
            }

            if (undefined !== p.id) {
                return p.id;
            }
        }

        return res;
    };

    hooks = async (p: HooksParams): Promise<HooksResponse> =>
        await this.post<HooksResponse>(Endpoint.Hooks, p) as HooksResponse;

    journal = async (p: JournalParams): Promise<JournalResponse> =>
        await this.get<JournalResponse>(Endpoint.Journal, p) as JournalResponse;

    lookup = async (p: LookupParams): Promise<LookupResponse> =>
        await this.post<LookupResponse>(Endpoint.Lookup, p);

    pricing = async (p?: PricingParams): Promise<PricingResponse> =>
        await this.post<PricingResponse>(Endpoint.Pricing, p);

    sms = async (p: SmsParams): Promise<SmsResponse> => await this.post(Endpoint.Sms, p);

    status = async (p: StatusParams): Promise<StatusResponse> => {
        const res = await this.get<string>(Endpoint.Status, p);

        return p._json ? TextTransformer.status(res) : res;
    };

    validateForVoice = async (p: ValidateForVoiceParams):
        Promise<ValidateForVoiceResponse> =>
        (await this.post<ValidateForVoiceResponse>
        (Endpoint.ValidateForVoice, p) as ValidateForVoiceResponse);

    voice = async (p: VoiceParams): Promise<VoiceResponse> =>
        await this.post<string>(Endpoint.Voice, p);
}