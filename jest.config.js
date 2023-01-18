/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    bail: 1,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tests/tsconfig.json'
            },
        ],
    },
    verbose: true,
};
