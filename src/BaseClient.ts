import {ERROR_CODES} from './constants/ERROR_CODES';
import Util from './lib/Util';
import {Endpoint} from './constants/enums/Endpoint';

export type Params<T = {}> = T & { p: string, sendWith: string }

export class BaseClient {
    private static readonly BASE_URL = 'https://gateway.sms77.io/api';
    private static BASE_CFG = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
    };

    constructor(protected apiKey: string, protected sendWith: string = 'js') {
    }

    async post<R = string>(endpoint: Endpoint, data?: { [k: string]: any }): Promise<R | string> {
        const params = this.buildParams(data);
        const queryString = this.buildQueryString(params);
        const url = `${BaseClient.BASE_URL}/${endpoint}?${queryString}`;
        const res = await fetch(url, BaseClient.BASE_CFG);
        const text = await res.text();
        const code = Number.parseInt(text);

        if (ERROR_CODES.has(code)) {
            throw new Error(`${code}: ${ERROR_CODES.get(code)}`);
        }

        try {
            return JSON.parse(text) as R;
        } catch (e) {
        }

        return `${text}`;
    }

    private buildParams(data?: { [k: string]: any }): Params {
        return {
            ...data,
            p: this.apiKey,
            sendWith: this.sendWith,
        };
    }

    private buildQueryString(obj: Params): string {
        return Object.entries(obj).map(([k, v]) => {
            const key = encodeURIComponent(k);
            const value = encodeURIComponent(Util.toNumberedBool(v));
            return `${key}=${value}`;
        }).join('&');
    }
}