// eslint-ignore

module.exports = {
    target: "serverless",
    i18n: {
        locales: ["en"],
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
