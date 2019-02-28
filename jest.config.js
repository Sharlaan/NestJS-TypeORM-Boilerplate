module.exports = {
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
