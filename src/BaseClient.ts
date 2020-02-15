import {ERROR_CODES} from "./constants/ERROR_CODES";
import {SUCCESS_CODES} from "./constants/SUCCESS_CODES";
import {GSM_CODES} from "./constants/GSM_CODES";

export default class BaseClient {
    static BASE_URL = 'https://gateway.sms77.io/api';
    static ERROR_CODES = ERROR_CODES;
    static SUCCESS_CODES = SUCCESS_CODES;
    static GSM_CODES = GSM_CODES;

    constructor(protected apiKey: string, protected sendWith: string) {
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

        const res = await fetch(`${BaseClient.BASE_URL}/${endpoint}?${queryString}`, cfg);

        const text = await res.text();

        const code = Number.parseInt(text);
        if (BaseClient.ERROR_CODES.has(code)) {
            throw new Error(`${code}: ${BaseClient.ERROR_CODES.get(code)}`);
        }

        try {
            return JSON.parse(text);
        } catch (e) {
        }

        return text;
    }
}