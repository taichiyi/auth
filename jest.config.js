module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.(t|j)s': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts']
}
