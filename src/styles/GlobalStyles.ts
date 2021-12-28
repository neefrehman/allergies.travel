import { globalCss } from "stitches";

/* TODO: content-visibility - https://web.dev/content-visibility/ */

export const globalStyles = globalCss({
  body: {
    fontSize: "15px",
    "@mobileL": { fontSize: "16px" },
    "@tablet": { fontSize: "18px" },
  },
  h1: {
    fontFamily: "$chonburi",
    fontSize: "4em",
  },
  p: {
    fontFamily: "monospace",
  },
});
