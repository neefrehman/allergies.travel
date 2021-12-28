import { createStitches } from "@stitches/react";
import type { PropertyValue as CSSProp, CSS as StitchesCSS } from "@stitches/react";

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
      large: "8px",
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
  },
  utils: {
    m: (value: CSSProp<"margin">) => ({ margin: value }),
    mt: (value: CSSProp<"margin">) => ({ marginTop: value }),
    mb: (value: CSSProp<"margin">) => ({ marginBottom: value }),
    ml: (value: CSSProp<"margin">) => ({ marginLeft: value }),
    mr: (value: CSSProp<"margin">) => ({ marginRight: value }),
    mx: (value: CSSProp<"margin">) => ({ marginLeft: value, marginRight: value }),
    my: (value: CSSProp<"margin">) => ({ marginTop: value, marginBottom: value }),

    p: (value: CSSProp<"padding">) => ({ padding: value }),
    pt: (value: CSSProp<"padding">) => ({ paddingTop: value }),
    pb: (value: CSSProp<"padding">) => ({ paddingBottom: value }),
    pl: (value: CSSProp<"padding">) => ({ paddingLeft: value }),
    pr: (value: CSSProp<"padding">) => ({ paddingRight: value }),
    px: (value: CSSProp<"padding">) => ({ paddingLeft: value, paddingRight: value }),
    py: (value: CSSProp<"padding">) => ({ paddingTop: value, paddingBottom: value }),

    size: (value: CSSProp<"width">) => ({ width: value, height: value }),

    br: (value: CSSProp<"borderRadius">) => ({ borderRadius: value }),
  },
});

export type CSS = StitchesCSS<typeof config>;
