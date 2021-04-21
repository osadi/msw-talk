module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  // modulePaths: ["src"],
  // coverageReporters: ["json", "lcov", "text-summary"],
  collectCoverageFrom: [
    "!<rootDir>/**/.next/**",
    "**/*.{tsx,ts}",
    "!**/mocks/**",
    "!**.d.ts",
    "!**testHelpers.ts",
  ],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
};
