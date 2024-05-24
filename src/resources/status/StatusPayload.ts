import {ApiPayload} from '../../lib/ApiPayload'

export default class StatusPayload extends ApiPayload<{
    ids: number[]
}> {
    convert(): {
        [p: string]: any
    } {
        return {
            msg_id: this.params.ids.join(),
        }
    }
}
