import {SmsParams} from '../../types';
import isValidDate from 'date-fns/isValid';
import Util from '../../lib/Util';

export const DEFAULT_PATTERN = /[0-9a-z-@_.]/i;

export const DELAY_DATE_FORMAT = 'yyyy-mm-dd hh:ii';
export const DELAY_PATTERN = /^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const FOREIGN_ID_MAX_LENGTH = 64;
export const FOREIGN_ID_PATTERN = DEFAULT_PATTERN;

export const FROM_ALLOWED_SPECIAL_CHARS =
    ['/', ' ', '.', '-', '@', '_', '!', '(', ')', '+', '$', ',', '&',];
export const FROM_ALPHANUMERIC_MAX = 11;
export const FROM_NUMERIC_MAX = 16;

export const LABEL_MAX_LENGTH = 100;
export const LABEL_PATTERN = DEFAULT_PATTERN;

export const TEXT_MAX_LENGTH = 1520;

export const TTL_MAX = Number.MAX_SAFE_INTEGER;
export const TTL_MIN = 1;

export default (params: SmsParams) => {
    delay(params.delay);
    foreign_id(params.foreign_id);
    from(params.from);
    label(params.label);
    text(params.text);
    to(params.to);
    ttl(params.ttl);
}

export const foreign_id = (foreignId: SmsParams['foreign_id']) => {
    if (!foreignId) {
        return;
    }

    if (foreignId.match(FOREIGN_ID_PATTERN)) {
        throw new Error(`foreign_id must match the regex pattern ${FOREIGN_ID_PATTERN}.`);
    }

    if (FOREIGN_ID_MAX_LENGTH < foreignId.length) {
        throw new Error(
            `The foreign_id cannot be longer than ${FOREIGN_ID_MAX_LENGTH} characters.`);
    }
};

export const from = (from: SmsParams['from']) => {
    if (!from || !from.length) {
        return;
    }

    if (from.length > FROM_NUMERIC_MAX) {
        throw new Error('Argument \'from\' may not exceed $numericMax chars.');
    }

    if (from.length > FROM_ALPHANUMERIC_MAX && !Util.isNumeric(from)) {
        throw new Error(
            'Argument \'from\' must be numeric. if > $alphaNumericMax chars.');
    }

    for (const char of FROM_ALLOWED_SPECIAL_CHARS) {
        from = from.replace(char, '');
    }

    if (!Util.isAlphaNumeric(from)) {
        throw new Error('Argument \'from\' must be alphanumeric.');
    }
};

export const label = (label: SmsParams['label']) => {
    if (!label) {
        return;
    }

    if (label.match(LABEL_PATTERN)) {
        throw new Error(`label must match the regex pattern ${LABEL_PATTERN}.`);
    }

    if (LABEL_MAX_LENGTH < label.length) {
        throw new Error(
            `The label cannot be longer than ${LABEL_MAX_LENGTH} characters.`);
    }
};

export const text = (text: SmsParams['text']) => {
    if (!(text || '').length) {
        throw new Error('You cannot send an empty message.');
    }

    if (TEXT_MAX_LENGTH < text.length) {
        throw new Error(
            `The text cannot be longer than ${TEXT_MAX_LENGTH} characters.`);
    }
};

export const to = (to: SmsParams['to']) => {
    if (!(to || '').length) {
        throw new Error('You must specify at least one recipient.');
    }
};

export const ttl = (ttl: SmsParams['ttl']): void => {
    if (!ttl) {
        return;
    }

    if (ttl < TTL_MIN) {
        throw new Error(`ttl must be at least ${TTL_MIN}.`);
    }

    if (ttl > TTL_MAX) {
        throw new Error(`ttl may not exceed ${TTL_MAX}.`);
    }
};

export const delay = (delay: SmsParams['delay']): void => {
    if (!delay) {
        return;
    }

    if (isValidDate(delay)) {
        return;
    }

    if (!delay.match(DELAY_PATTERN))

        throw new Error('Delay must be a valid UNIX timestamp or in the format of '
            + `${DELAY_DATE_FORMAT}.`);
};