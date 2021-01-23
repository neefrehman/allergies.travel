const path = require("path");

const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
    reactOptions: {
        fastRefresh: true,
    },
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
    ],
    webpackFinal: async baseConfig => {
        const nextConfig = require("../next.config.js");
        baseConfig.resolve.modules = [
            path.resolve(__dirname, ".."),
            "node_modules",
        ];
        baseConfig.resolve.alias = {
            ...baseConfig.resolve.alias,
            "@emotion/core": toPath("node_modules/@emotion/react"),
            "@emotion/styled": toPath("node_modules/@emotion/styled"),
            "emotion-theming": toPath("node_modules/@emotion/react"),
        };
        return { ...nextConfig.webpack, ...baseConfig };
    },
};
