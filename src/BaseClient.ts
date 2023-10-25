import Util from './lib/Util'
import {Endpoint} from './constants/Endpoint'
import {ErrorCode} from './constants/ErrorCode'

const METHODS = [
    'delete',
    'get',
    'post'
] as const
type Response<R> = R | string;
type Method = (typeof METHODS)[number];
type MethodArgs = [Endpoint, RequestPayload, boolean | undefined]
type RequestPayload = { [k: string]: any } | undefined | null

export type MethodCall = <R>(...a: MethodArgs) => Promise<Response<R>>;

interface HttpMethods {
    delete: MethodCall
    get: MethodCall
    post: MethodCall
}

export class BaseClient implements HttpMethods {
    public static readonly BASE_URL = 'https://gateway.sms77.io/api'

    constructor(
        protected apiKey: string,
        protected sentWith: string = 'js',
        protected debug: boolean = false,
    ) {
        this.assertIs<{ [k in Method]: MethodCall }>(this)
    }

    delete = async <R>(endpoint: Endpoint, payload?: RequestPayload, json = false)
        : Promise<Response<R>> => await this.request<R>('delete', endpoint, payload, json)

    get = async <R>(endpoint: Endpoint, payload: RequestPayload): Promise<Response<R>> =>
        await this.request<R>('get', endpoint, payload)

    post = async <R>(endpoint: Endpoint, payload: RequestPayload): Promise<Response<R>> =>
        await this.request<R>('post', endpoint, payload)

    private assertIs<T>(value: unknown): asserts value is T {
    }

    private async request<R>(
        method: Method, endpoint: Endpoint, o: RequestPayload = {}, json = false):
        Promise<Response<R>> {
        let url = `${BaseClient.BASE_URL}/${endpoint}`
        const headers: HeadersInit = {
            sentWith: this.sentWith,
        }

        if (this.apiKey.startsWith('Bearer ')) headers.Authorization = this.apiKey
        else headers['X-Api-Key'] = this.apiKey

        const opts: RequestInit = {
            headers,
            method,
        }

        if (o && Object.keys(o).length) {
            o = this.normalizePayload(o)

            if (json) {
                opts.body = JSON.stringify(o)
                headers['Content-Type'] = 'application/json'
            } else {
                const params = new URLSearchParams

                Object.entries(o).forEach((([k, v]) => {
                    if (Array.isArray(v)) {
                        v.forEach((i, n) => {
                            if (typeof i === 'object' && 'contents' in i && 'name' in i) { // is likely SmsFile
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

                switch (method) {
                    case 'get':
                        url += `?${params.toString()}`
                        break
                    default:
                        opts.body = params
                }
            }
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

    private normalizePayload = (o: { [k: string]: any }): { [k: string]: any } => Object.fromEntries(
        Object.entries(o).map(([k, v]) => [
            k,
            Util.toNumberedBool(v)
        ]))
}
