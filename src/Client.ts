import SHA from 'jssha'
import {md5} from 'js-md5'
import {ApiPayload} from './lib/ApiPayload'
import {Endpoint, ErrorCode} from './lib'
import Util from './lib/Util'

export type ClientOptions = {
    apiKey: string
    debug?: boolean
    sentWith?: string
    signingSecret?: string
}

export class Client {
    public static readonly BASE_URL = 'https://gateway.seven.io/api'
    public static readonly CONTENT_TYPE_URLENCODED = 'application/x-www-form-urlencoded'

    constructor(protected options: ClientOptions) {
    }

    request = async <R extends any, P extends ApiPayload>(
        method: 'delete' | 'get' | 'post' | 'patch',
        endpoint: Endpoint | string,
        payload: P,
        contentType: string = 'application/json'
    ): Promise<R> => {
        payload = payload.convert() as any
        let url = `${Client.BASE_URL}/${endpoint}`
        const headers: HeadersInit = {
            Accept: 'application/json',
            'Content-Type': contentType,
            SentWith: this.options.sentWith ?? 'js',
        }

        if (this.options.apiKey.startsWith('Bearer ')) headers.Authorization = this.options.apiKey
        else headers['X-Api-Key'] = this.options.apiKey

        const opts: RequestInit = {
            method,
        }

        const params = new URLSearchParams
        if (payload && Object.keys(payload).length) {
            Object.entries(payload).forEach((([k, v]) => {
                if (Array.isArray(v)) {
                    v.forEach((i, n) => {
                        if (typeof i === 'object' && 'contents' in i && 'name' in i) { // is likely SmsFile
                            const prepend = `files[${n}]`

                            params.set(`${prepend}[contents]`, i.contents)
                            params.set(`${prepend}[name]`, i.name)
                            if ('password' in i) params.set(`${prepend}[password]`, i.password)
                            if ('validity' in i) params.set(`${prepend}[validity]`, i.validity)
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

        if (this.options.signingSecret) {
            const timestamp = Number.parseInt((Date.now() / 1000).toString())
            const nonce = Util.uuid()
            const httpVerb = method.toUpperCase()
            const toHash = Object.keys(payload).length
                ? contentType === Client.CONTENT_TYPE_URLENCODED
                    ? params.toString()
                    : JSON.stringify(payload)
                : ''
            const hashMD5 = md5(toHash)
            const toSign = [timestamp, nonce, httpVerb, url, hashMD5].join('\n').trim()
            const hash = new SHA('SHA-256', 'TEXT', {
                hmacKey: {
                    format: 'TEXT',
                    value: this.options.signingSecret
                }
            })
                .update(toSign)
                .getHash('HEX')

            headers['X-Nonce'] = nonce
            headers['X-Signature'] = hash
            headers['X-Timestamp'] = timestamp.toString()
        }

        const res = await fetch(url, {...opts, headers})
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
                body: opts.body instanceof URLSearchParams
                    ? Object.fromEntries(opts.body) : opts.body,
                url,
            },
            response: {
                apiCode,
                body,
                headers: Object.fromEntries(res.headers),
                status: res.status,
            },
        })

        if (apiCode && apiCode in ErrorCode) throw new Error(`${apiCode}: ${ErrorCode[apiCode]}`)

        return body as R
    }
}
