// eslint-ignore

module.exports = {
    preset: "ts-jest",
    moduleDirectories: ["node_modules", ".", "src/utils/tests", __dirname],
    testPathIgnorePatterns: [
        "<rootDir>/.next/",
        "<rootDir>/node_modules/",
        "<rootDir>/cypress/",
    ],
    setupFilesAfterEnv: ["<rootDir>/src/utils/tests/test-setup.ts"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
