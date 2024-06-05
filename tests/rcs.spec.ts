import client from './lib/client'
import {type RcsDispatchParams, type RcsEventParams, type RcsMessage, RcsResource} from '../src'

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
