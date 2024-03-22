import {isBefore} from 'date-fns'
import Util from '../lib/Util'
import {SmsParams} from '../resources/sms/types'
import AbstractValidator from './AbstractValidator'

export default class SmsValidator extends AbstractValidator<Partial<SmsParams>> {
    static readonly DEFAULT_PATTERN = /[0-9a-z-@_.]/i
    static readonly FOREIGN_ID_MAX_LENGTH = 64
    static readonly FOREIGN_ID_PATTERN = SmsValidator.DEFAULT_PATTERN
    static readonly FROM_ALLOWED_SPECIAL_CHARS = [
        '/',
        ' ',
        '.',
        '-',
        '@',
        '_',
        '!',
        '(',
        ')',
        '+',
        '$',
        ',',
        '&',
    ]
    static readonly FROM_ALPHANUMERIC_MAX = 11
    static readonly FROM_NUMERIC_MAX = 16
    static readonly LABEL_MAX_LENGTH = 100
    static readonly LABEL_PATTERN = SmsValidator.DEFAULT_PATTERN
    static readonly TEXT_MAX_LENGTH = 1520
    static readonly TTL_MAX = Number.MAX_SAFE_INTEGER
    static readonly TTL_MIN = 1

    validate(): boolean {
        try {
            this.delay()
            this.files()
            this.foreignId()
            this.from()
            this.label()
            this.text()
            this.to()
            this.ttl()
        } catch (_) {
            return false
        }

        return true
    }

    files = (files = this.params.files) => {
    }

    foreignId = (foreignId = this.params.foreign_id): void => {
        if (!foreignId) return

        if (foreignId.match(SmsValidator.FOREIGN_ID_PATTERN))
            this.addError('foreign_id', `foreign_id must match the regex pattern ${SmsValidator.FOREIGN_ID_PATTERN}.`)

        if (SmsValidator.FOREIGN_ID_MAX_LENGTH < foreignId.length)
            this.addError('foreign_id',
                `The foreign_id cannot be longer than ${SmsValidator.FOREIGN_ID_MAX_LENGTH} characters.`)
    }

    from = (from = this.params.from): void => {
        if (!from || !from.length) return

        if (from.length > SmsValidator.FROM_NUMERIC_MAX)
            this.addError('from', 'Argument \'from\' may not exceed $numericMax chars.')

        if (from.length > SmsValidator.FROM_ALPHANUMERIC_MAX && !Util.isNumeric(from))
            this.addError('from', 'Argument \'from\' must be numeric. if > $alphaNumericMax chars.')

        for (const char of SmsValidator.FROM_ALLOWED_SPECIAL_CHARS) from = from.replace(char, '')

        if (!Util.isAlphaNumeric(from)) this.addError('from', 'Argument \'from\' must be alphanumeric.')
    }

    label = (label = this.params.label): void => {
        if (!label) return

        if (label.match(SmsValidator.LABEL_PATTERN))
            this.addError('label', `label must match the regex pattern ${SmsValidator.LABEL_PATTERN}.`)

        if (SmsValidator.LABEL_MAX_LENGTH < label.length)
            this.addError('label',
                `The label cannot be longer than ${SmsValidator.LABEL_MAX_LENGTH} characters.`)
    }

    text = (text = this.params.text): void => {
        if (!(text || '').length) this.addError('text', 'You cannot send an empty message.')

        if (SmsValidator.TEXT_MAX_LENGTH < text!.length)
            this.addError('text',
                `The text cannot be longer than ${SmsValidator.TEXT_MAX_LENGTH} characters.`)
    }

    to = (to = this.params.to): void => {
        if (!(to || []).length) this.addError('to', 'You must specify at least one recipient.')
    }

    ttl = (ttl = this.params.ttl): void => {
        if (!ttl) return

        if (ttl < SmsValidator.TTL_MIN)
            this.addError('ttl', `ttl must be at least ${SmsValidator.TTL_MIN}.`)

        if (ttl > SmsValidator.TTL_MAX)
            this.addError('ttl', `ttl may not exceed ${SmsValidator.TTL_MAX}.`)
    }

    delay = (delay = this.params.delay): void => {
        if (!delay) return

        if (isBefore(delay, new Date))
            this.addError('delay', 'Delay can not be a date in the past')
    }
}
