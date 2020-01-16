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
            mncs:  string[]
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

export const errorCodes = new Map([
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

    async post(endpoint: string, data?: any): Promise<any> {
        const params = {
            ...data,
            p: this.apiKey,
            sendWith: this.sendWith,
        };

        const queryString = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');

        const cfg = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
        };

        const url = `https://gateway.sms77.io/api/${endpoint}?${queryString}`;

        const res = await fetch(url, cfg);

        const text = await res.text();

        const code = Number.parseInt(text);
        if (errorCodes.has(code)) {
            return Promise.reject(`${code}: ${errorCodes.get(code)}`);
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