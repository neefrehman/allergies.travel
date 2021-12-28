import { createStitches } from "@stitches/react";
import type { PropertyValue, CSS as StitchesCSS } from "@stitches/react";

export const { styled, css, globalCss, getCssText, theme, config } = createStitches({
  theme: {
    colors: {
      white: "#ffffff",
      spaceNavy: "#061923",
      bluePrimary: "hsla(222, 89%, 50%, 100%)",
      blueAccent: "hsla(222, 89%, 50%, 8%)",
    },
    space: {
      1: "2px",
      2: "4px",
      3: "6px",
      4: "8px",
      5: "10px",
    },
    fonts: {
      chonburi: "Chonburi, serif",
      dazzed: "DAZZED-TRIAL",
    },
    fontSizes: {
      small: "0.8rem",
      regular: "1rem",
      large: "2rem",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {
      small: "4px",
      medium: "8px",
      large: "12px",
    },
    shadows: {
      /** For smaller cards like CountryCard */
      small: "0px 2px 20px rgba(5, 25, 36, 0.07)",
      large: "0px 2px 32px rgba(5, 25, 36, 0.09)",
    },
    zIndices: {},
    transitions: {},
  },
  /** breakpoint values from Chrome devtools */
  media: {
    mobileS: "(min-width: 320px)",
    mobileM: "(min-width: 375px)",
    mobileL: "(min-width: 425px)",
    tablet: "(min-width: 768px)",
    laptop: "(min-width: 1024px)",
    laptopL: "(min-width: 1440px)",
    desktop: "(min-width: 2560px)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
    normalMotion: "(prefers-reduced-motion: no-preference)",
  },
  utils: {
    marginX: (value: PropertyValue<"margin">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: PropertyValue<"margin">) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: PropertyValue<"padding">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: PropertyValue<"padding">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    size: (value: PropertyValue<"width">) => ({ width: value, height: value }),
  },
});

export type CSS = StitchesCSS<typeof config>;
