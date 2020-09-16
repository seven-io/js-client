/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
    bail: 1,
    globals: {
        'ts-jest': {
            tsConfig: 'tests/tsconfig.json'
        },
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'node',
    verbose: false,
};