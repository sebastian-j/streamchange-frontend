import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  coverageProvider: 'v8',
  coverageDirectory: 'coverage',

  coverageThreshold: {
    global: {
      branches: 3,
      functions: 3,
      lines: 3,
      statements: 3,
    },
  },

  coverageReporters: ['cobertura', 'lcov', 'text'],

  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
  ],

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  clearMocks: true,
  resetMocks: false,
  restoreMocks: false,

  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],

  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
};

export default config;
