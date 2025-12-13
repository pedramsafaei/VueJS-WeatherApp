module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/unit/**/*.spec.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/registerServiceWorker.js',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
