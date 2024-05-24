import Util from '../../lib/Util'
import type {VoiceParams} from './types'
import AbstractValidator from '../../lib/AbstractValidator'

export default class VoiceValidator extends AbstractValidator<Partial<VoiceParams>> {
    static readonly FROM_NUMERIC_MAX = 16
    static readonly TEXT_MAX_LENGTH = 10000

    validate(): boolean {
        try {
            this.from()
            this.ringtime()
            this.text()
            this.to()
        } catch (_) {
            return false
        }

        return true
    }

    ringtime = (value = this.params.ringtime): void => {
        if (value === undefined) return
        if (value <= 0 || value > 60)
            this.addError('ringtime', 'Argument \'ringtime\' must be between 1 and 60.')
    }

    from = (value = this.params.from): void => {
        if (!value || !value.length) return

        if (!Util.isNumeric(value))
            this.addError('from', 'Argument \'from\' must be numeric.')

        if (value.length > VoiceValidator.FROM_NUMERIC_MAX)
            this.addError('from', 'Argument \'from\' may not exceed $numericMax chars.')
    }

    text = (text = this.params.text): void => {
        if (!(text || '').length) this.addError('text', 'You cannot send an empty message.')

        if (VoiceValidator.TEXT_MAX_LENGTH < text!.length)
            this.addError('text',
                `The text cannot be longer than ${VoiceValidator.TEXT_MAX_LENGTH} characters.`)
    }

    to = (to = this.params.to) => {
        if (!(to || '').length) this.addError('to', 'You must specify exactly one recipient.')
    }
}
