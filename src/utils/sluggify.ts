/** Converts strings of text to kebab-case, while removing any diacritics from lêttërs */
export const sluggify = (string: string): string => {
    if (!string) return "";

    const matches =
        string
            .normalize("NFD") // splits diacritics from their base letter
            .replace(/[\u0300-\u036f]/g, "") // removes those diacritics
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            ) ?? [];

    return matches.map(x => x.toLowerCase()).join("-");
};
