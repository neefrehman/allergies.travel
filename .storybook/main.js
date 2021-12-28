const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
    "@storybook/addon-storysource",
  ],
  features: {
    previewCsfV3: true,
  },
  webpackFinal: async baseConfig => {
    const nextConfig = require("../next.config.js");
    baseConfig.resolve.modules = [
      ...(baseConfig.resolve.modules || []),
      path.resolve(__dirname, "../src"),
      "node_modules",
    ];
    baseConfig.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];

    return { ...nextConfig.webpack, ...baseConfig };
  },
};
