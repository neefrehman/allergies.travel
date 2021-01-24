import path from "path";
import fs from "fs";

// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from "prettier";

import { getAllCountryData } from "data/fetchers";

import nextConfig from "../../next.config";

/**
 * Generates a sitemap of all pages and published skethes. To be used in index.tsx's getStaticProps
 */
export const generateSitemap = async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc");

    const staticPagesPath = path.resolve("src/pages");
    const pages = fs.readdirSync(staticPagesPath); // Get all pages from `/pages`.
    const staticPageArray = pages
        .filter(
            name =>
                name[0] !== "_" && // Ignore Next specific files
                name[0] !== "[" && // and dynamic route templates
                name !== "404.tsx" && // and 404
                name !== "api" // and api routes
        )
        .map(name => name.replace(".tsx", "").replace("index", "")); // Index becomes homepage

    const supportedLocales = nextConfig.i18n.locales;

    const countryPages = supportedLocales.reduce((acc, locale) => {
        const allCountriesinLocale = getAllCountryData({
            locale,
        })
            .filter(country => country.published)
            .map(country => country.slug);

        return [...acc, ...allCountriesinLocale];
    }, [] as string[]);

    // TODO: i18n handling & lastModified, allergen paths

    const allRoutes = [...staticPageArray, ...countryPages];
    const urlPaths = allRoutes.map(route => (route !== "" ? `/${route}` : route));

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlPaths
                .map(
                    route =>
                        `
                        <url>
                            <loc>${`https://allergies.travel${route}`}</loc>
                        </url>
                    `
                )
                .join("")}
        </urlset>
    `;

    const formattedSitemap = prettier.format(sitemap, {
        ...prettierConfig,
        parser: "html",
    });

    fs.writeFileSync("public/sitemap.xml", formattedSitemap);
};
