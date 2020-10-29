import fetch, {RequestInit} from 'node-fetch';
import {ERROR_CODES} from './constants/ERROR_CODES';
import Util from './lib/Util';
import {Endpoint} from './constants/enums/Endpoint';
import {AnyObject} from './types';

const globalThis = require('globalthis');
const FormData = require('form-data');

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}

export type Params = [string, string | number][];
export type Response<R> = R | string;

export class BaseClient {
    public static readonly BASE_URL = 'https://gateway.sms77.io/api';

    constructor(protected apiKey: string, protected sentWith: string = 'js') {
    }

    protected get = async <R = string>(e: Endpoint, o?: AnyObject): Promise<Response<R>> =>
        await this.request(e, 'GET', o);

    protected post = async <R = string>(e: Endpoint, o?: AnyObject): Promise<Response<R>> =>
        await this.request(e, 'POST', o);

    private async request<R = string>(
        e: Endpoint, method: 'GET' | 'POST', o: AnyObject = {}): Promise<Response<R>> {
        let url = `${BaseClient.BASE_URL}/${e}`;
        const opts: RequestInit = {
            headers: {
                Authorization: `Basic ${this.apiKey}`,
                sentWith: this.sentWith,
            },
            method,
        };

        if (o) {
            o = this.normalizePayload(o);
            const entries = Object.entries(o);
            const qs = this.toQueryString(entries);

            if (method === 'GET') {
                url += `?${qs}`;
            } else {
                const fd = new FormData();
                entries.forEach(([k, v]) => fd.append(k, v));
                opts.body = fd;
            }
        }

        const res = await fetch(url, opts);
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

    private buildQueryStringGGG(obj: Params): string {
        return Object.entries(obj).map(([k, v]) => {
            const key = encodeURIComponent(k);
            const value = encodeURIComponent(Util.toNumberedBool(v));
            return `${key}=${value}`;
        }).join('&');
    }

    private normalizePayload(o: AnyObject): AnyObject {
        const p: AnyObject = {};

        Object.entries(o).forEach(([k, v]) => p[k] = Util.toNumberedBool(v));

        return p;
    }

    private toQueryString(p: Params): string {
        return p.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
    }
}