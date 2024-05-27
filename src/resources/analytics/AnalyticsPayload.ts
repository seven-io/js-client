import {format} from 'date-fns'
import {ApiPayload} from '../../lib/ApiPayload'
import type {AnalyticsParams} from './types'

export default class AnalyticsPayload extends ApiPayload<AnalyticsParams> {
    override convert(): {
        [k: string]: any
    } {
        this.end()
        this.start()

        return this.payload
    }

    protected end(): void {
        if (this.params.end) this.payload.end = this.formatDate(this.params.end)
        return this.payload.end
    }

    protected start(): void {
        if (this.params.start) this.payload.start = this.formatDate(this.params.start)
    }

    protected formatDate(date: Date): string {
        return format(date, 'yyyy-MM-dd')
    }
}
