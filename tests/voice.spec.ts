import Util from '../src/lib/Util'
import SevenClient from '../src/SevenClient'
import {VoiceJsonResponse, VoiceParams, VoiceResponse} from '../src/types'
import {dummmyVoiceResponseJson, dummmyVoiceResponseText} from './data/voice'
import client from './lib/client'
import {voiceMatcher} from './matchers/voice'

const voice: SevenClient['voice'] = process.env.SEVEN_LIVE_TEST
    ? client.voice
    : jest.fn(async (p: VoiceParams) =>
        p.json ? dummmyVoiceResponseJson : dummmyVoiceResponseText)

const expectJson = (o: VoiceJsonResponse) => expect(o)
    .toMatchObject<VoiceResponse>(voiceMatcher)

const commonParams: VoiceParams = {
    debug: false,
    from: 'Tom Tester',
    ringtime: 10,
    text: 'This is a Test!',
    to: process.env.SEVEN_RECIPIENT!,
    xml: false,
}

describe('Voice', () => {
    it('should return a text response', async () => {
        const text = await voice(commonParams) as string
        const [code, id, cost] = Util.splitByLine(text)
        expect(code).toHaveLength(3)
        expect(Number.parseInt(id)).toBeGreaterThan(0)
        expect(Number.parseFloat(cost)).toBeGreaterThanOrEqual(0)
    })

    it('should return a json response', async () => {
        const opts: VoiceParams = {...commonParams, json: true}
        const json = await voice(opts) as VoiceJsonResponse
        expectJson(json)
    })

    it('should return a json dummy response', async () => {
        const opts: VoiceParams = {...commonParams, debug: true, json: true}
        const json = await voice(opts) as VoiceJsonResponse
        expectJson(json)
        expect(json.total_price).toEqual(0)
        expect(json.debug).toEqual(true)
    })
})
