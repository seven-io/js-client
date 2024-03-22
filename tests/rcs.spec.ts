import client from './lib/client'
import environment from './lib/environment'
import {ResourceMock} from './lib/utils'
import RcsResource from '../src/resources/rcs/RcsResource'
import {RcsDispatchParams, RcsEventParams, RcsMessage} from '../src/resources/rcs/types'

jest.mock('../src', () => ({
    RcsResource: jest.fn().mockImplementation((): ResourceMock<RcsResource> => {
        return environment.live
            ? new RcsResource(client)
            : {
                async delete() {
                    return {success: true}
                },
                async dispatch() {
                    return {
                        balance: 3218.988,
                        debug: 'false',
                        messages: [
                            {
                                channel: 'RCS',
                                encoding: 'gsm',
                                error: null,
                                error_text: null,
                                id: '77233319353',
                                is_binary: false,
                                label: null,
                                parts: 0,
                                price: 0,
                                recipient: '49176123456789',
                                sender: 'myfancyagent',
                                success: true,
                                text: 'Hello World!',
                                udh: null,
                            },
                        ],
                        sms_type: 'direct',
                        success: '100',
                        total_price: null,
                    }
                },
                async event() {
                    return {success: true}
                },
            }
    })
}))

const resource = new RcsResource(client)

const assertMessage = (msg: RcsMessage) => expect(msg)
    .toMatchObject<RcsMessage>({
        channel: expect.any(String),
        encoding: expect.any(String),
        error: expect.nilOrAny(String),
        error_text: expect.nilOrAny(String),
        id: expect.nilOrAny(String),
        is_binary: expect.any(Boolean),
        label: expect.nilOrAny(String),
        messages: expect.nilOrAny(Array),
        parts: expect.any(Number),
        price: expect.any(Number),
        recipient: expect.any(String),
        sender: expect.any(String),
        success: expect.any(Boolean),
        text: expect.any(String),
        udh: expect.nilOrAny(String),
    })

describe('RCS', () => {
    it('should schedule a message and delete it again', async () => {
        const params: RcsDispatchParams = {
            delay: '2050-12-12 00:00:00',
            text: 'Hey!',
            to: '491716992343'
        }
        const dispatchResponse = await resource.dispatch(params)
        expect(dispatchResponse.messages).toHaveLength(1)
        dispatchResponse.messages.forEach(assertMessage)
        const msg = dispatchResponse.messages[0]
        const id = msg.id
        expect(id).not.toBeNull()

        const deleteResponse = await resource.delete({id: id!})
        expect(deleteResponse.success).toBeTruthy()
    })

    it('should dispatch an event', async () => {
        const params: RcsEventParams = {
            event: 'IS_TYPING',
            msg_id: '',
            //to: '',
        }
        const eventResponse = await resource.event(params)
        expect(eventResponse.success).toBeTruthy()

    })
})
