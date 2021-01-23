const path = require("path");

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
        return { ...nextConfig.webpack, ...baseConfig };
    },
};
