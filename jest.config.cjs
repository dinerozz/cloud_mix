module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
};
