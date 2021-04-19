// eslint-ignore

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
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "\\.(obj|gltf)$": "jest-url-loader",
    },
    transformIgnorePatterns: ["node_modules/(?!three)"],
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
