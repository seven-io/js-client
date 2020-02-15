import {
    ContactsParams,
    ContactsResponse,
    LookupParams,
    LookupResponse,
    PricingParams,
    PricingResponse,
    SmsParams,
    StatusParams,
    StatusResponse,
    ValidateForVoiceParams,
    ValidateForVoiceResponse,
    VoiceParams,
    VoiceResponse,
} from './types';
import {ERROR_CODES} from "./ERROR_CODES";
import {SUCCESS_CODES} from "./SUCCESS_CODES";

const splitByLine = (str: string): string[] => str.split('\n');

export class Sms77Client {
    static BASE_URL = 'https://gateway.sms77.io/api';

    constructor(protected apiKey: string, protected sendWith: string = 'js') {
    }

    async post(endpoint: string, data?: { [key: string]: any }): Promise<any> {
        const params: { [key: string]: any } = {
            ...data,
            p: this.apiKey,
            sendWith: this.sendWith,
        };

        const boolToNumber = (v: any) => 'boolean' === typeof v ? v ? 1 : 0 : v;

        const queryString = Object.entries(params).map(([k, v]) =>
            `${encodeURIComponent(k)}=${encodeURIComponent(boolToNumber(v))}`).join('&');

        const cfg = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
        };

        const res = await fetch(`${Sms77Client.BASE_URL}/${endpoint}?${queryString}`, cfg);

        const text = await res.text();

        const code = Number.parseInt(text);
        if (ERROR_CODES.has(code)) {
            throw new Error(`${code}: ${ERROR_CODES.get(code)}`);
        }

        try {
            return JSON.parse(text);
        } catch (e) {
        }

        return text;
    }

    async balance(): Promise<number> {
        return Number.parseFloat(await this.post('balance'));
    }

    async contacts(p: ContactsParams): Promise<ContactsResponse> {
        const res = await this.post('contacts', p);

        if ('string' === typeof res) { //return CSV if ContactsParams.json was set to 0
            return res;
        } else if (Array.isArray(res)) {
            return res;
        }

        if (SUCCESS_CODES.has(Number.parseInt(res.return))) {
            if (res.id) {
                return Number.parseInt(res.id);
            } else if (p.id) {
                return p.id;
            }
        }

        throw new Error(res);
    }

    async lookup(params: LookupParams): Promise<LookupResponse> {
        const res = await this.post('lookup', params);

        const isValidResponse = (str: string) => 100 === Number.parseInt(str);

        if ('string' === typeof res) {
            if (!isValidResponse(res)) {
                throw new Error(res);
            }
        } else if (res.code) {
            if (!isValidResponse(res.code)) {
                throw new Error(res);
            }
        }

        return res;
    }

    async pricing(params: PricingParams): Promise<PricingResponse> {
        return await this.post('pricing', params);
    }

    async sms(params: SmsParams): Promise<any> {
        return await this.post('sms', params);
    }

    async status(params: StatusParams): Promise<StatusResponse> {
        const res = await this.post('status', params);

        const [report, timestamp] = splitByLine(res);

        return {report: report as StatusResponse['report'], timestamp};
    }

    async validateForVoice(params: ValidateForVoiceParams): Promise<ValidateForVoiceResponse> {
        return await this.post('validate_for_voice', params);
    }

    async voice(params: VoiceParams): Promise<VoiceResponse> {
        const res = await this.post('voice', params);

        const [code, id, cost] = splitByLine(res);

        return {
            code: Number.parseInt(code),
            id: Number.parseInt(id),
            cost: Number.parseFloat(cost)
        };
    }
}

export default Sms77Client;