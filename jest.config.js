module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.{ts,tsx}",
    "<rootDir>/contexts/**/*.{ts,tsx}",
    "<rootDir>/lib/**/*.{ts,tsx}",
    "!<rootDir>/node_modules/",
  ],
  coverageDirectory: "<rootDir>/coverage",
};