import 'cross-fetch/polyfill'
import * as matchers from 'jest-extended'

expect.extend(matchers)

expect.extend({
    nilOrAny(received: any, expected: any) {
        const receivedType = typeof received
        const expectedType = typeof expected
        let pass = received instanceof expected

        if (null === received) pass = true
        else {
            if (Number === expected) pass = receivedType === 'number' || received instanceof Number
            else if (String === expected) pass = receivedType === 'string' || received instanceof String
            else if (Array === expected) pass = Array.isArray(received) || received instanceof Array
            else if (RegExp === expected) pass = (expected as RegExp).test(received)
        }

        return {
            message: () => `expected null or instance of ${expectedType} and` +
                ` received ${receivedType === 'object' ? 'null' : receivedType}`,
            pass,
        }
    },
})