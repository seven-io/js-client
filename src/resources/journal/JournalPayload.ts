import {ApiPayload} from '../../ApiPayload'
import {JOURNAL_TYPES} from './constants'

export default class JournalPayload<T extends {}> extends ApiPayload<{
    type: (typeof JOURNAL_TYPES)[number]
} & T> {
    convert(): {
        [p: string]: any
    } {
        return {}
    }
}
