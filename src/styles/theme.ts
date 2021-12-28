import { hsla } from "utils/createHSLAstring";

export const theme = {
  colors: {
    white: "#ffffff",
    spaceNavy: "#061923",
    blue: {
      primary: hsla(222, 89, 50, 100),
      accent: hsla(222, 89, 50, 8),
      create: (l = 50, a = 100) => hsla(222, 89, l, a),
    },
  },
  fonts: {
    chonburi: `"Chonburi", serif"`,
    dazzed: `"DAZZED-TRIAL"`,
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
    /** For smaller cards like CountryCard */
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
  /** breakpoint values from Chrome devtools */
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
    /** Creates a media query to handle sizes above a value */
    above: (breakpoint: number) => `@media (min-width: ${breakpoint + 1}px)`,
    /** Creates a media query to handle sizes below a value */
    below: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
  },
} as const;

// ⌄ workaround for manual typing: https://twitter.com/neefrehman_/status/1337052860421447685
type InferedThemeType = typeof theme;

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends InferedThemeType {}
}
