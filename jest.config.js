/** @typedef {import('ts-jest')} */

module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tests/tsconfig.json'
        },
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'jsdom',
    verbose: true,
};