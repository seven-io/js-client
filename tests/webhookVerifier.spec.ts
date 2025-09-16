import ngrok from '@ngrok/ngrok';
import {HooksResource, SmsResource, WebhookVerifier} from "../src";
import environment from "./lib/environment";
import client from './lib/client'
import express, {Request, Response} from 'express';
import {timeout} from "./lib/utils";
import {setImmediate} from 'timers'

global.setImmediate = setImmediate; // jsdom testEnvironment hack

const PORT = 5678

it('WebhookVerifier', async () => {
    const {NGROK_AUTHTOKEN} = process.env
    expect(NGROK_AUTHTOKEN).toBeDefined()

    const listener = await ngrok.forward({authtoken_from_env: true, port: PORT})

    const targetUrl = listener.url()
    expect(targetUrl).not.toBeNull()
    console.log('targetUrl', targetUrl)

    const hooksResource = new HooksResource(client)
    const {id} = await hooksResource.subscribe({
        eventType: 'all',
        requestMethod: 'JSON',
        targetUrl: targetUrl!
    })
    expect(id).toBeDefined()

    const {signingSecret} = environment
    expect(signingSecret).toBeDefined()

    const webhookVerifier = new WebhookVerifier({signingSecret})

    let done = false
    const app = express()
    app.post('/', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
        res.status(200).send()

        console.log('callback')

        if (done) return
        done = true

        await hooksResource.unsubscribe(id!)

        const result = await webhookVerifier.verify({
            body: req.body,
            headers: req.headers,
            method: req.method,
            url: req.originalUrl,
        })

        expect(result.valid).toBe(true)
    })
    app.listen(PORT, () => `Listening on port ${PORT}`)

    const smsResource = new SmsResource(client)
    await smsResource.dispatch({text: 'webhook verification test', to: ['+491716992343']})

    await timeout(3000)
})
