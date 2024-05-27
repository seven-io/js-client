import {ApiPayload} from './lib/ApiPayload'
import {Endpoint, ErrorCode} from './lib'
import type {ClientOptions} from './types'
import SHA from 'jssha'
import Util from './lib/Util'

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

        if (this.options.signingSecret) {
            const timestamp = Number.parseInt((Date.now() / 1000).toString())
            const nonce = Util.uuid()
            const httpVerb = method.toUpperCase()
            const toHash = Object.keys(payload).length ? JSON.stringify(payload) : ''
            console.log('toHash', toHash)
            const hashMD5 = Util.md5(toHash)
            const toSign = [timestamp, nonce, httpVerb, url, hashMD5].join('\n')
            console.log('toSign', toSign)
            const hash = new SHA('SHA-256', 'TEXT', {
                encoding: 'UTF8',
                hmacKey: {
                    encoding: 'UTF8',
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

        if (apiCode && apiCode in ErrorCode) throw new Error(`${apiCode}: ${ErrorCode[apiCode]}`)

        return body as R
    }
}
