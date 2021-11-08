// eslint-ignore
module.exports = {
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
    },
    images: {
        disableStaticImages: true, // to avoid peanutworld fallback image error
    },
    experimental: {
        eslint: true,
    },
    future: {
        webpack5: true,
    },
    pageExtensions: ["page.tsx", "api.ts"],
    webpack(config /* , options */) {
        config.module.rules.push({
            test: [/\.obj$/, /\.jpe?g$/],
            use: ["url-loader"],
        });
        return config;
    },
};
