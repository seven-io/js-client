export type ContactsParams = {
    action: 'del' | 'read' | 'write'
    email?: string
    empfaenger?: string
    id?: number
    json?: boolean
    nick?: string
}

export type ContactsResponse = {
    email: string
    id: number
    nick: string,
    number: string,
}[] | string | number

export type PricingParams = {
    type?: 'direct' | 'economy'
    country?: string
    format?: 'json' | 'csv'
}

export type PricingResponse = {
    countCountries: number
    countNetworks: number
    countries: {
        countryCode: string
        countryName: string
        countryPrefix: string
        networks: {
            mcc: string
            mncs: string[]
            networkName: string
            price: number
            features: string[]
            comment: string
        }[]
    }[]
}

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
    performance_tracking?: boolean
    return_msg_id?: boolean
}

export type StatusParams = {
    msg_id: string
}

export type StatusResponse = {
    report: 'DELIVERED' | 'NOTDELIVERED' | 'BUFFERED' | 'TRANSMITTED' | 'ACCEPTED' | 'EXPIRED' | 'REJECTED' | 'FAILED' | 'UNKNOWN'
    timestamp: string
}

export type ValidateForVoiceParams = {
    number: string
    callback?: string
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

export type VoiceParams = {
    text: string
    to: string
    xml?: boolean
    from?: string
}

export type VoiceResponse = {
    code: number
    cost: number
    id: number
}

export const BASE_URL = 'https://gateway.sms77.io/api';

export const SUCCESS_CODES = new Map([
    [151, 'Contacts updated/created/deleted with CSV response.'],
    [152, 'Contacts updated/created/deleted with JSON response.'],
]);

export const ERROR_CODES = new Map([
    [201, 'Country code invalid.'],
    [202, 'Recipient number invalid.'],
    [300, 'Authentication missing.'],
    [301, 'Parameter to missing.'],
    [304, 'Parameter type missing.'],
    [305, 'Parameter text missing.'],
    [306, 'Sender invalid.'],
    [307, 'Parameter url missing.'],
    [400, 'Invalid type.'],
    [401, 'Parameter text too long.'],
    [402, 'Reload lock.'],
    [500, 'Not enough credits.'],
    [600, 'Carrier failed.'],
    [700, 'Unknown error.'],
    [801, 'Logo file missing.'],
    [802, 'Logo file not existent.'],
    [803, 'Ring tone missing.'],
    [900, 'Wrong API key!'],
    [901, 'Wrong message ID.'],
    [902, 'API deactivated.'],
    [903, 'IP not allowed.'],
]);

const splitByLine = (str: string): string[] => str.split('\n');

export class Sms77Client {
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

        const res = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, cfg);

        const text = await res.text();

        const code = Number.parseInt(text);
        if (ERROR_CODES.has(code)) {
            throw new Error(`${code}: ${ERROR_CODES.get(code)}`);
        }

        try {
            return JSON.parse(text)
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

        return {code: Number.parseInt(code), id: Number.parseInt(id), cost: Number.parseFloat(cost)};
    }
}

export default Sms77Client;