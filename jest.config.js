module.exports = {
  testEnvironmentOptions: {
    url: 'http://dev.rakuten.tv:3000',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/style.js',
  },
  transformIgnorePatterns: ['node_modules/(?!swiper)/'],
};
