module.exports = {
  // preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [],
  resolver: '<rootDir>/jest.resolver.js',
  // setupFiles: ['./jest.setup.js']
};
