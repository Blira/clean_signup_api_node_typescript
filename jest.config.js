module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/presentation/protocols/index.ts",
    "<rootDir>/src/presentation/controllers/signup/signup-protocols.ts",
    "<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts",
    "<rootDir>/src/main/server.ts",
    "<rootDir>/src/main/config/env.ts"
  ],
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
