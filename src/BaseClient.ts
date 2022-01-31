import Util from './lib/Util'
import {Endpoint} from './constants/Endpoint'
import {AnyObject} from './types'
import {ErrorCode} from './constants/ErrorCode'

const METHODS = [
    'get',
    'post'
] as const
type Response<R> = R | string;
type Method = (typeof METHODS)[number];
type MethodArgs = [Endpoint, AnyObject | undefined | null]

export type MethodCall = <R>(...a: MethodArgs) => Promise<Response<R>>;

interface HttpMethods {
    get: MethodCall
    post: MethodCall
}

export class BaseClient implements HttpMethods {
    public static readonly BASE_URL = 'https://gateway.sms77.io/api'

    constructor(
        protected apiKey: string,
        protected sentWith: string = 'js',
        protected debug: boolean = false) {
        this.assertIs<{ [k in Method]: MethodCall }>(this)

        for (const name of METHODS) this[name] =
            async <R>(...a: MethodArgs): Promise<Response<R>> =>
                await this.request<R>(name, a)
    }

    get = async <R>(...a: MethodArgs): Promise<Response<R>> => ''

    post = async <R>(...a: MethodArgs): Promise<Response<R>> => ''

    private assertIs<T>(value: unknown): asserts value is T {
    }

    private async request<R>(method: Method, [e, o = {}]: MethodArgs):
        Promise<Response<R>> {
        let url = `${BaseClient.BASE_URL}/${e}`
        const opts: RequestInit = {
            headers: {
                Authorization: this.apiKey.startsWith('Bearer ')
                    ? this.apiKey : `Basic ${this.apiKey}`,
                sentWith: this.sentWith,
            },
            method,
        }

        if (o && Object.keys(o).length) {
            o = this.normalizePayload(o)
            const entries = Object.entries(o)
            const params = new URLSearchParams

            entries.forEach((([k, v]) => {
                if (Array.isArray(v)) {
                    v.forEach((i, n) => {
                        // is likely SmsFile
                        if (typeof i === 'object' && 'contents' in i && 'name' in i) {
                            const prepend = `files[${n}]`

                            params.set(`${prepend}[contents]`, i.contents)
                            params.set(`${prepend}[name]`, i.name)
                            if ('password' in i)
                                params.set(`${prepend}[password]`, i.password)
                            if ('validity' in i)
                                params.set(`${prepend}[validity]`, i.validity)
                        } else params.append(k, i)
                    })
                } else params.set(k, v)
            }))

            'get' === method ? url += `?${params.toString()}` : opts.body = params
        }

        const res = await fetch(url, opts)
        let body = await res.text()
        let apiCode: ErrorCode | null = null

        if (typeof body === 'string') {
            try {
                body = JSON.parse(body)
            } catch (_) {
            }
        }

        const type = typeof body
        if (type === 'string' || type === 'number') {
            const parsed = Number.parseFloat(`${body}`)

            if (Number.isInteger(parsed)) apiCode = parsed
        }

        if (this.debug) console.debug({
            request: {
                ...opts,
                url,
                body: opts.body instanceof URLSearchParams
                    ? Object.fromEntries(opts.body) : opts.body,
            },
            response: {
                apiCode,
                body,
                headers: Object.fromEntries(res.headers),
                status: res.status,
            },
        })

        if (apiCode && apiCode in ErrorCode)
            throw new Error(`${apiCode}: ${ErrorCode[apiCode]}`)

        return body
    }

    private normalizePayload = (o: AnyObject): AnyObject => Object.fromEntries(
        Object.entries(o).map(([k, v]) => [
            k,
            Util.toNumberedBool(v)
        ]))
}
