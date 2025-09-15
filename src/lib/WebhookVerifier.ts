import SHA from 'jssha'
import * as jsEnv from "browser-or-node"

export interface WebhookVerifierOptions {
    signingSecret: string
    maxAgeSeconds?: number
}

export interface WebhookVerificationParams {
    headers: Record<string, string | string[] | undefined>
    body: string | Buffer | object
    url: string
    method: string
}

export interface WebhookVerificationResult {
    valid: boolean
    error?: string
    timestamp?: number
    nonce?: string
}

export class WebhookVerifier {
    private readonly signingSecret: string
    private readonly maxAgeSeconds: number

    constructor(options: WebhookVerifierOptions) {
        this.signingSecret = options.signingSecret
        this.maxAgeSeconds = options.maxAgeSeconds ?? 300 // 5 minutes default
    }

    /**
     * Verify the authenticity of an incoming webhook from seven.io
     */
    async verify(params: WebhookVerificationParams): Promise<WebhookVerificationResult> {
        try {
            // Extract signature headers
            const timestamp = this.getHeader(params.headers, 'x-timestamp')
            const nonce = this.getHeader(params.headers, 'x-nonce')
            const signature = this.getHeader(params.headers, 'x-signature')

            if (!timestamp || !nonce || !signature) {
                return {
                    valid: false,
                    error: 'Missing required signature headers (X-Timestamp, X-Nonce, X-Signature)'
                }
            }

            // Validate timestamp
            const timestampNum = parseInt(timestamp, 10)
            if (isNaN(timestampNum)) {
                return {
                    valid: false,
                    error: 'Invalid timestamp format'
                }
            }

            const now = Math.floor(Date.now() / 1000)
            const age = now - timestampNum

            if (age > this.maxAgeSeconds) {
                return {
                    valid: false,
                    error: `Webhook too old: ${age} seconds (max: ${this.maxAgeSeconds})`
                }
            }

            if (age < -this.maxAgeSeconds) {
                return {
                    valid: false,
                    error: `Webhook from future: ${-age} seconds ahead`
                }
            }

            // Prepare body for hashing
            let bodyToHash = ''
            if (typeof params.body === 'string') {
                bodyToHash = params.body
            } else if (Buffer.isBuffer(params.body)) {
                bodyToHash = params.body.toString('utf8')
            } else if (typeof params.body === 'object' && params.body !== null) {
                bodyToHash = JSON.stringify(params.body)
            }

            // Compute MD5 hash of body
            let hashMD5: string
            if (jsEnv.isBrowser) {
                const { md5 } = await import('js-md5')
                hashMD5 = md5(bodyToHash)
            } else {
                const { createHash } = await import('node:crypto')
                const hashFunc = createHash('md5')
                hashFunc.update(bodyToHash)
                hashMD5 = hashFunc.digest('hex')
            }

            // Construct the string to sign (same as outgoing requests)
            const httpVerb = params.method.toUpperCase()
            const toSign = [timestampNum, nonce, httpVerb, params.url, hashMD5].join('\n')

            // Compute expected signature
            const expectedHash = new SHA('SHA-256', 'TEXT', {
                hmacKey: {
                    format: 'TEXT',
                    value: this.signingSecret
                }
            })
                .update(toSign)
                .getHash('HEX')

            // Compare signatures (constant-time comparison)
            const isValid = this.constantTimeEqual(expectedHash.toLowerCase(), signature.toLowerCase())

            return {
                valid: isValid,
                timestamp: timestampNum,
                nonce,
                error: isValid ? undefined : 'Signature mismatch'
            }
        } catch (error) {
            return {
                valid: false,
                error: `Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
        }
    }

    /**
     * Get header value case-insensitively
     */
    private getHeader(headers: Record<string, string | string[] | undefined>, name: string): string | undefined {
        const lowerName = name.toLowerCase()
        for (const [key, value] of Object.entries(headers)) {
            if (key.toLowerCase() === lowerName) {
                return Array.isArray(value) ? value[0] : value
            }
        }
        return undefined
    }

    /**
     * Constant-time string comparison to prevent timing attacks
     */
    private constantTimeEqual(a: string, b: string): boolean {
        if (a.length !== b.length) {
            return false
        }

        let result = 0
        for (let i = 0; i < a.length; i++) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i)
        }
        return result === 0
    }
}