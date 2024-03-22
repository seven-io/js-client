import {VoiceMessage, VoiceParams, VoiceResource, VoiceResponse} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'

jest.mock('../src', () => ({
    VoiceResource: jest.fn().mockImplementation((): ResourceMock<VoiceResource> => {
        return environment.live
            ? new VoiceResource(client)
            : {
                async dispatch(): Promise<VoiceResponse> {
                    return {
                        balance: 12.088,
                        debug: true,
                        messages: [
                            {
                                error: null,
                                error_text: null,
                                id: '123456789',
                                price: 0,
                                recipient: '491771783130',
                                sender: '491771783130',
                                success: true,
                                text: 'HEY!',
                            },
                        ],
                        success: '100',
                        total_price: 0,
                    }
                },
            }
    }),
}))

const resource = new VoiceResource(client)
const expectJSON = (o: VoiceResponse) => expect(o).toMatchObject<VoiceResponse>({
    balance: expect.any(Number),
    debug: expect.any(Boolean),
    messages: expect.arrayContaining<VoiceMessage>([
        {
            error: expect.toBeOneOf([
                String,
                null,
            ]),
            error_text: expect.toBeOneOf([
                String,
                null,
            ]),
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
            debug: false,
            from: 'Tom Tester',
            ringtime: 10,
            text: 'This is a Test!',
            to: '4917123456789',
            xml: false,
        })
        expectJSON(json)
    })

    it('should return a json dummy response', async () => {
        const opts: VoiceParams = {
            debug: true,
            from: 'Tom Tester',
            ringtime: 10,
            text: 'This is a Test!',
            to: '4917123456789',
            xml: false,
        }
        const json = await resource.dispatch(opts)
        expectJSON(json)
        expect(json.total_price).toEqual(0)
        expect(json.debug).toEqual(true)
    })
})
