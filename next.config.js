module.exports = {
    webpack(config /* , options */) {
        config.module.rules.push({
            test: /\.obj$/,
            use: ["url-loader"],
        });
        return config;
    },
};
