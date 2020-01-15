export type SmsParams = {
    from?: string
    text: string
    to: string
}

export class Sms77Client {
    constructor(protected apiKey: string) {
    }

    async post(endpoint: string, data?: any): Promise<any> {
        const params = {
            ...data,
            p: this.apiKey,
            sendWith: 'js',
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

        try {
            return JSON.parse(text)
        } catch (e) {
        }

        return text;
    }

    async balance(): Promise<any> {
        return await this.post('balance');
    }

    async sms(params: SmsParams): Promise<any> {
        return await this.post('sms', params);
    }
}

export default Sms77Client;