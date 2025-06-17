module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', 'src'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: { "^.+\\.(js|jsx|ts|tsx)$": [ "babel-jest", { presets: [ [ "next/babel", { "preset-react": { runtime: "automatic" }, }, ], ], }, ], },
  }