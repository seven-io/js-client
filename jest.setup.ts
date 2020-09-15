//@ts-ignore
import * as failFast from 'jasmine-fail-fast';

//@ts-ignore
const jasmineEnv = jasmine.getEnv();

jasmineEnv.addReporter(failFast.init());

expect.extend({
    nilOrAny(received: any, expected: any) {
        const receivedType = typeof received;
        const expectedType = typeof expected;
        let pass = received instanceof expected;

        if (null === received || undefined === received) {
            pass = true;
        } else {
            if (Number === expected) {
                pass = receivedType === 'number' || received instanceof Number;
            } else if (String === expected) {
                pass = receivedType === 'string' || received instanceof String;
            } else if (Array === expected) {
                pass = Array.isArray(received) || received instanceof Array;
            }
        }

        let msg = `expected null/undefined or instance of ${expectedType} and `;
        msg += `received ${'object' === receivedType ? 'null' : receivedType}`

        return {
            message: () => msg,
            pass,
        };
    },
});