// eslint-ignore

module.exports = {
    target: "experimental-serverless-trace",
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
    },
    experimental: {
        eslint: true,
    },
    future: {
        webpack5: true,
    },
    webpack(config /* , options */) {
        config.module.rules.push({
            test: [/\.obj$/, /\.jpe?g$/],
            use: ["url-loader"],
        });
        return config;
    },
};
