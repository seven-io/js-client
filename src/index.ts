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

export const errorCodes = [
    '201: Country code invalid.',
    '202: Recipient number invalid.',
    '300: Authentication missing.',
    '301: Parameter to missing.',
    '304: Parameter type missing.',
    '305: Parameter text missing.',
    '306: Sender invalid.',
    '307: Parameter url missing.',
    '400: Invalid type.',
    '401: Parameter text too long.',
    '402: Reload lock.',
    '500: Not enough credits.',
    '600: Carrier failed.',
    '700: Unknown error.',
    '801: Logo file missing.',
    '802: Logo file not existent.',
    '803: Ring tone missing.',
    '900: Wrong API key!',
    '901: Wrong message ID.',
    '902: API deactivated.',
    '903: IP not allowed.',
];

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

        const errorCode = errorCodes.find(s => Number.parseInt(text) === Number.parseInt(s));
        if (errorCode) {
            return Promise.reject(errorCode);
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

    async sms(params: SmsParams): Promise<any> {
        return await this.post('sms', params);
    }
}

export default Sms77Client;
