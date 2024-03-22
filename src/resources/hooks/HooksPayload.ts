import {ApiPayload} from '../../ApiPayload'

export default class HooksPayload<T extends {}> extends ApiPayload<{
    action: 'read' | 'subscribe' | 'unsubscribe'
} & T> {
    convert(): {
        [p: string]: any
    } {
        return {}
    }
}
