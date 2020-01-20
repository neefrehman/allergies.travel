module.exports = {
    siteMetadata: {
        siteTitle: "allergies.travel",
        siteSubtitle: "Travel safely :—)",
        siteDescription: "",
        siteImage: "",
        twitter: "@neefrehman_",
        name: "Neef Rehman",
        siteUrl: "https://allergies.travel"
    },
    plugins: [
        "gatsby-plugin-eslint",
        "gatsby-plugin-linaria",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-robots-txt",
        "gatsby-plugin-netlify",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: "https://allergies.travel"
            }
        }
        // {
        //     resolve: "gatsby-plugin-manifest",
        //     options: {
        //         name: "allergies.travel",
        //         short_name: "allergies.travel",
        //         start_url: "/",
        //         display: "minimal-ui",
        //         icon: "./src/assets/favicon.png"
        //     }
        // }
        // {
        //     resolve: "gatsby-plugin-layout",
        //     options: {
        //         component: require.resolve("./src/components/layout.jsx")
        //     }
        // }
    ]
};
