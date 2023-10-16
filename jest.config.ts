import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main/',
    '<rootDir>/tests',
    '<rootDir>/src/infra/db/prisma/prisma-helper.ts'
  ]
}

export default config
