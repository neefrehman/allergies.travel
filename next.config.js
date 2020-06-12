const withCSS = require("@zeit/next-css");

module.exports = withCSS({
    webpack(config /* , options */) {
        config.module.rules.push({
            test: /\.(js|ts|tsx)$/,
            use: [
                {
                    loader: "linaria/loader",
                    options: {
                        sourceMap: process.env.NODE_ENV !== "production"
                    }
                }
            ]
        });
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ["raw-loader", "glslify-loader"]
        });
        config.module.rules.push({
            test: /\.obj$/,
            use: ["url-loader"]
        });
        return config;
    }
});
