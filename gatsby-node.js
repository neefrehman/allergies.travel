exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        // from https://github.com/LekoArts/gatsby-react-three-fiber/blob/master/gatsby-node.js
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
