/** @typedef {import('ts-jest')} */

module.exports = {
    bail: 1,
    globals: {
        'ts-jest': {
            tsconfig: 'tests/tsconfig.json'
        },
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'node',
    verbose: false,
};