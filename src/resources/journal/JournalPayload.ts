import {ApiPayload} from '../../lib/ApiPayload'
import {JournalParams} from './types'

export default class JournalPayload extends ApiPayload<JournalParams> {
    convert(): {
        [p: string]: any
    } {
        const {dateFrom, dateTo, ...params} = this.params

        return {
            ...params,
            date_from: dateFrom,
            date_to: dateTo
        }
    }
}
