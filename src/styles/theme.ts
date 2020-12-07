export const theme = {
    colors: {
        spaceNavy: "#061923",
        white: "#ffffff",
    },
    fonts: {
        chonburi: `"Chonburi", serif"`,
    },
    fontSizes: {
        small: "0.8rem",
        regular: "1rem",
        large: "2rem",
    },
    borderRadius: {
        small: "4px",
        large: "8px",
    },
    shadows: {
        small: "0px 2px 20px rgba(5, 25, 36, 0.07)",
        large: "0px 2px 32px rgba(5, 25, 36, 0.09)",
    },
    layout: {
        appMaxWidth: "1200px",
        gridGap: "36px",
        spacing: {
            small: "2rem",
            medium: "3rem",
            large: "4rem",
        },
    },
    zIndex: {
        // ...indices
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
    media: {
        dark: "@media (prefers-color-scheme: dark)",
        light: "@media (prefers-color-scheme: light)",
        reducedMotion: "@media (prefers-reduced-motion: reduce)",
        above: (breakpoint: number) => `@media (min-width: ${breakpoint + 1}px)`,
        below: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
    },
};

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            [color in keyof typeof theme.colors]: string;
        };
        fonts: {
            [font in keyof typeof theme.fonts]: string;
        };
        fontSizes: {
            [fontSize in keyof typeof theme.fontSizes]: string;
        };
        borderRadius: {
            [font in keyof typeof theme.borderRadius]: string;
        };
        shadows: {
            [fontSize in keyof typeof theme.shadows]: string;
        };
        layout: {
            appMaxWidth: string;
            gridGap: string;
            spacing: {
                [spacingSize in keyof typeof theme.layout.spacing]: string;
            };
        };
        zIndex: {
            [index in keyof typeof theme.zIndex]: number;
        };
        /** breakpoint values from Chrome devtools */
        breakpoints: {
            [breakpoint in keyof typeof theme.breakpoints]: number;
        };
        media: {
            dark: string;
            light: string;
            reducedMotion: string;
            /** Creates a media query to handle sizes above a value */
            above: (breakpoint: number) => string;
            /** Creates a media query to handle sizes below a value */
            below: (breakpoint: number) => string;
        };
    }
}
