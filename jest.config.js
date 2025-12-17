/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: { strict: false, esModuleInterop: true, target: 'ES2020', module: 'commonjs' } }]
  }
};
