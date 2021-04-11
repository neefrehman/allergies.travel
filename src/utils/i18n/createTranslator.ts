import type { TranslationNamespaces, TranslationStrings } from "data/schemas";

type TranslatorKey = `${TranslationNamespaces}.${string}`;

/**
 * Returns a translator instance to be used to insert copy throughout the site
 */
export const createTranslator = (
    translations: TranslationStrings
): ((t: TranslatorKey) => string) => {
    const t = (translationKey: TranslatorKey) => {
        const [namespace, key] = translationKey.split(".");
        const fallback =
            process.env.NODE_ENV === "production"
                ? `!! MISSING TRANSLATION: ${translationKey} !!`
                : translationKey;

        return translations[namespace]?.[key] ?? fallback;
    };

    return t;
};

// TODO: swap for context implementation once _app.tsx can support getStaticProps. this
// would avoid having to get the translations inside each page's generation
