/* eslint-disable react/no-danger */
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

// TODO: PWA support
// TODO: navigator.share sheet

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <title>allergies.travel</title>

                    <link rel="icon" href="/static/favicon.ico" />
                    <meta name="author" content="Neef Rehman" />
                    <meta name="title" content="allergies.travel" />
                    <meta name="description" content="Not coming soon." />

                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Chonburi"
                    />

                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-122323130-1"
                    />
                    <meta
                        name="google-site-verification"
                        content="wQKszS0jKVKPsouNwVNd1UP3YWgBZ9RV49yf8MP8ED8"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'UA-122323130-1', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://allergies.travel" />
                    <meta property="og:title" content="allergies.travel" />
                    <meta property="og:description" content="Not coming soon" />
                    <meta
                        property="og:image"
                        content="https://allergies.travel/static/meta-image.jpeg"
                    />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta
                        property="twitter:url"
                        content="https://allergies.travel"
                    />
                    <meta property="twitter:title" content="allergies.travel" />
                    <meta
                        property="twitter:description"
                        content="Not coming soon"
                    />
                    <meta
                        property="twitter:image"
                        content="https://allergies.travel/static/meta-image.jpeg"
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
