import {SmsJsonResponse, SmsParams} from '../../src/types';

export type OptionalSmsParams = Omit<SmsParams, 'text' | 'to'>;

export const fullSmsParams: OptionalSmsParams = {
    flash: true,
    foreign_id: 'TestForeignID',
    from: 'Tom Tester',
    json: true,
    label: 'TestLabel',
    no_reload: true,
    performance_tracking: true,
    ttl: 128000,
    udh: 'MyTestHeader',
    unicode: true,
    utf8: true,
};

export const requiredSmsParams: Pick<SmsParams, 'text' | 'to'> = {
    text: `The current date is: ${Date.now()}.`,
    to: process.env.SMS77_RECIPIENT!.replace('+', ''),
};

export const jsonDummy = (p: SmsParams): SmsJsonResponse => ({
    balance: 8.42,
    debug: p.debug ? 'true' : 'false',
    messages: Array(p.to.includes(',') ? p.to.split(',').length : 1).fill({
        encoding: 'gsm',
        error: null,
        error_text: null,
        id: null,
        parts: 1,
        price: 0,
        recipient: p.to || requiredSmsParams.to,
        sender: p.from || 'Sms77.io',
        success: true,
        text: p.text || requiredSmsParams.text,
    }),
    sms_type: 'direct',
    success: '100',
    total_price: 0,
});

export const msgIdDummy = '100\n1234567890';

export const detailedDummy = (p: SmsParams) =>
    '100\n'
    + 'Verbucht: 0\n'
    + 'Preis: 0.075\n'
    + 'Guthaben: 8.495\n'
    + `Text: ${p.text || requiredSmsParams.text}\n`
    + 'SMS-Typ: direct\n'
    + `Flash SMS: ${'flash' in p ? p.flash : false}\n`
    + 'Encoding: gsm\n'
    + 'GSM0338: true\n'
    + `Debug: ${'debug' in p ? p.debug : false}`;