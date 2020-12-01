export const theme = {
    colors: {
        spaceNavy: "#061923",
        white: "#ffffff",
    },
    breakpoints: {
        mobileS: 320,
        mobileM: 375,
        mobileL: 425,
        tablet: 768,
        laptop: 1024,
        laptopL: 1440,
        desktop: 2560,
    },
    mqs: {
        above: (breakpoint: number) => `@media (min-width: ${breakpoint + 1}px)`,
        below: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
    },
};

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            [color in keyof typeof theme.colors]: string;
        };
        /** breakpoint values from Chrome devtools */
        breakpoints: {
            [breakpoint in keyof typeof theme.breakpoints]: number;
        };
        mqs: {
            /** Creates a media query to handle sizes above a value */
            above: (breakpoint: number) => string;
            /** Creates a media query to handle sizes below a value */
            below: (breakpoint: number) => string;
        };
    }
}
