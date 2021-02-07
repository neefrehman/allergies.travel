import path from "path";
import fs from "fs";

// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from "prettier";

import { getAllCountryData, getAllAllergensInCountry } from "data/fetchers";

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

    const dynamicPageArray = supportedLocales.reduce((localesAcc, locale) => {
        const allCountryPages = getAllCountryData({
            locale,
        })
            .filter(country => country.published)
            .map(country => country.slug);

        const allAllergenPages = allCountryPages.reduce((acc, country) => {
            const allAllergens = getAllAllergensInCountry({
                slug: country,
                locale,
            });
            const paths = allAllergens.map(allergen => `${country}/${allergen}`);
            return [...acc, ...paths];
        }, [] as string[]);

        // TODO: return {path: string, localesPathIsSupportedIn: ISO_CODE[]} for alternate creation
        return [...localesAcc, ...allCountryPages, ...allAllergenPages];
    }, [] as string[]);

    const allRoutes = [...staticPageArray, ...dynamicPageArray];
    const urlPaths = allRoutes.map(route => (route !== "" ? `/${route}` : route));

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlPaths
                .map(
                    route =>
                        `
                        <url>
                            <loc>https://allergies.travel${route}</loc>
                            <xhtml:link 
                                rel="alternate"
                                hreflang=${"en" /* TODO: dynamic locale */}
                                href="https://allergies.travel/${"en"}/${route}"/>
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
