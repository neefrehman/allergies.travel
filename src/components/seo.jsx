import React from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../hooks/use-site-metadata";

const SEO = ({ title, description, image }) => {
    const {
        siteUrl,
        siteTitle,
        siteDescription,
        siteImage,
        twitter,
        name
    } = useSiteMetadata();

    const pageTitle = title ? `${title} — ${siteTitle}` : siteTitle;
    const pageDescription = description || siteDescription;
    const pageImage = image || siteImage;

    return (
        <Helmet htmlAttributes={{ lang: "en" }}>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />

            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="author" content={name} />
            {/* <link rel="canonical" href={siteUrl} /> */}

            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={pageImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitter} />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={pageImage} />

            <link
                href="https://fonts.googleapis.com/css?family=Chonburi"
                rel="stylesheet"
            />

            {/* {keywords && (
                <meta
                    name="keywords"
                    content={keywords.toString().replace(/,/g, ", ")}
                />
            )} */}
        </Helmet>
    );
};

export default SEO;
