/** Converts strings of text to kebab-case */
export const kebabCase = (string: string): string => {
    const matches =
        string.match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        ) ?? [];

    return matches.map(x => x.toLowerCase()).join("-");
};
