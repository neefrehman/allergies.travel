exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.gltf$/,
                    use: ["url-loader"]
                }
            ]
        }
    });
};

exports.onCreatePage = ({ page, actions }) => {
    const { deletePage, createPage } = actions;

    return new Promise(resolve => {
        if (page.componentPath === `${__dirname}/src/pages/index/index.jsx`) {
            deletePage(page);
            createPage({
                ...page,
                path: "/"
            });
        }
        resolve();
    });
};
