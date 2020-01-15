export type SmsParams = {
    from?: string
    text: string
    to: string
}

export class Sms77Client {
    constructor(protected apiKey: string) {
    }

    async post(endpoint: string, body?: any): Promise<any> {
        const url = `https://gateway.sms77.io/api/${endpoint}`;

        const cfg = {
            body: {
                ...body,
                p: this.apiKey,
                sendWith: 'js',
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            url,
        };

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