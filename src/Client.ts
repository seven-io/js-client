import {ApiPayload} from './lib/ApiPayload'
import {Endpoint, ErrorCode} from './lib'
import {ClientOptions} from './types'

export default class Client {
    public static readonly BASE_URL = 'https://gateway.seven.io/api'

    constructor(protected options: ClientOptions) {
    }

    request = async <R extends any, P extends ApiPayload>(
        method: 'delete' | 'get' | 'post' | 'patch',
        endpoint: Endpoint | string,
        payload: P,
    ): Promise<R> => {
        payload = payload.convert() as any
        let url = `${Client.BASE_URL}/${endpoint}`
        const headers: HeadersInit = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            SentWith: this.options.sentWith ?? 'js',
        }

        if (this.options.apiKey.startsWith('Bearer ')) headers.Authorization = this.options.apiKey
        else headers['X-Api-Key'] = this.options.apiKey

        const opts: RequestInit = {
            headers,
            method,
        }

        if (payload && Object.keys(payload).length) {
            const params = new URLSearchParams

            Object.entries(payload).forEach((([k, v]) => {
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

        const res = await fetch(url, opts)
        let body = await res.text()
        let apiCode: ErrorCode | null = null

        try {
            body = JSON.parse(body)
        } catch (_) {
        }

        const type = typeof body
        if (type === 'string' || type === 'number') {
            const parsed = Number.parseFloat(`${body}`)

            if (Number.isInteger(parsed)) apiCode = parsed
        }

        if (this.options.debug) console.debug({
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

        return body as R
    }
}
