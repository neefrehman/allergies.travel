import type { TranslationNamespaces, TranslationStrings } from "data/schemas";

type TranslatorKey = `${TranslationNamespaces}.${string}`;

/** Returns a translator instance to be used to insert copy throughout the site */
export const createTranslator = (
    translations: TranslationStrings
): ((t: TranslatorKey) => string) => {
    const t = (translationKey: TranslatorKey) => {
        const [namespace, key] = translationKey.split(".");
        return translations[namespace][key];
    };

    return t;
};

// TODO: setup an exra util for testing. maybe export a `t` instance from "test-utils"?

// TODO: swap for context implementation once _app.tsx can support getStaticProps. this
// would avoidhaving to get the translations inside each page's generation
