// eslint-ignore

module.exports = {
    webpack(config /* , options */) {
        config.module.rules.push({
            test: [/\.obj$/, /\.jpe?g$/],
            use: ["url-loader"],
        });
        return config;
    },

    i18n: {
        locales: ["en", "de", "es"],
        defaultLocale: "en",
    },
};
