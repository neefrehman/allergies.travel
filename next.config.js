// eslint-ignore

module.exports = {
    target: "experimental-serverless-trace",
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
    },
    webpack(config /* , options */) {
        config.module.rules.push({
            test: [/\.obj$/, /\.jpe?g$/],
            use: ["url-loader"],
        });
        return config;
    },
};
