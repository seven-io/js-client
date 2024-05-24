import type {JestConfigWithTsJest} from 'ts-jest'

const cfg: JestConfigWithTsJest = {
    bail: 1,
    collectCoverage: true,
    clearMocks: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        './jest.setup.ts',
        'jest-extended/all',
    ],
    testEnvironment: 'jsdom',
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.ts': [
            'ts-jest',
            {
                tsconfig: './tests/tsconfig.test.json',
            },
        ],
    },
    verbose: true,
}

export default cfg
