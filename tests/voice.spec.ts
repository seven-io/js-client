import client from './lib/client'
import {type VoiceMessage, type VoiceParams, VoiceResource, type VoiceResponse} from '../src'

const resource = new VoiceResource(client)
const expectJSON = (o: VoiceResponse) => expect(o).toMatchObject<VoiceResponse>({
    balance: expect.any(Number),
    debug: expect.any(Boolean),
    messages: expect.arrayContaining<VoiceMessage>([
        {
            error: expect.nilOrAny(String),
            error_text: expect.nilOrAny(String),
            id: expect.any(String),
            price: expect.any(Number),
            recipient: expect.any(String),
            sender: expect.any(String),
            success: expect.any(Boolean),
            text: expect.any(String),
        },
    ]),
    success: expect.any(String),
    total_price: expect.any(Number),
})

describe('Voice', () => {
    it('should return a json response', async () => {
        const json = await resource.dispatch({
            from: 'Tom Tester',
            ringtime: 10,
            text: 'This is a Test!',
            to: '4917123456789',
        })
        expectJSON(json)
    })

    it('should return a json dummy response', async () => {
        const opts: VoiceParams = {
            from: 'Tom Tester',
            ringtime: 10,
            text: 'This is a Test!',
            to: '4917123456789',
        }
        const json = await resource.dispatch(opts)
        expectJSON(json)
        expect(json.total_price).toEqual(0)
        expect(json.debug).toEqual(true)
    })
})
