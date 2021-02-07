type HSLAString<
    H extends number,
    S extends number,
    L extends number,
    A extends number = 100
> = `hsla(${H}, ${S}%, ${L}%, ${A}%)`;

/** Creates an hsla string to be parsed by CSS */
export const hsla = <
    H extends number,
    S extends number,
    L extends number,
    A extends number = 100
>(
    h: H,
    s: S,
    l: L,
    a?: A
) => `hsla(${h}, ${s}%, ${l}%, ${a || 100}%)` as HSLAString<H, S, L, A>;
