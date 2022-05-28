module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],

  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.js$": "babel-jest",
  },
  // below value is taken from stack overflow to fix unexpected token issue
  // https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export#:~:text=%22transformIgnorePatterns%22%3A%20%5B%0A%20%20%20%20%20%20%22node_modules/(%3F!%40ngrx%7C(%3F!deck.gl)%7Cng%2Ddynamic)%22%0A%20%20%20%20%5D
  // defualt config provides
  // transformIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  snapshotSerializers: ["jest-serializer-vue"],

  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
  ],

  testURL: "http://localhost/",

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: false,
};
