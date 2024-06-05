import {ApiPayload} from '../../lib/ApiPayload'
import type {SmsParams} from './types'

export default class SmsPayload extends ApiPayload<SmsParams> {
    convert(): {
        [p: string]: any
    } {
        const {delay, to, ...params} = this.params

        /*        const {delay, files: files_ = [], to, ...params} = this.params
                const files = {}

                files_.forEach((file, idx) => {
                    const prepend = `files[${idx}]`

                    params.set(`${prepend}[contents]`, file.contents)
                    params.set(`${prepend}[name]`, file.name)
                    if ('password' in file) params.set(`${prepend}[password]`, file.password)
                    if ('validity' in file) params.set(`${prepend}[validity]`, file.validity)
                })*/

        return {
            ...params,
            delay: delay ? delay.valueOf() : undefined,
            to: to.join(',')
        }
    }
}
