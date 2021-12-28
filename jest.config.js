/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "src", "src/utils/tests"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/utils/tests/test-setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "\\.(obj|gltf)$": "jest-url-loader",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(three)/)"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/utils/tests/styleMock.ts",
    ...pathsToModuleNameMapper(
      compilerOptions.paths /*, { prefix: '<rootDir>/' } */
    ),
  },
};
