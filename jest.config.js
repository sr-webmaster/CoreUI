const JestConfig = require('vue-cli-plugin-freshinup-ui/utils/testing/jest.config.core')

module.exports = {
  ...JestConfig,
  collectCoverageFrom: JestConfig.collectCoverageFrom.concat([
    'src/**/*.{js,vue}'
  ]),
  coverageThreshold: {
    global: {
      branches: 66,
      functions: 71,
      lines: 78
    }
  },
  moduleNameMapper: {
    '@freshinup/core-ui/tests/(.*)$': '<rootDir>/tests/$1',
    ...JestConfig.moduleNameMapper,
    '@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [],
  testEnvironment: 'jest-environment-jsdom-fourteen'
}
