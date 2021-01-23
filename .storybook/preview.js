import React from "react";
import { ThemeProvider } from "@emotion/react";

import { GlobalStyles } from "../src/styles/GlobalStyles";
import { theme } from "../src/styles/theme";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
    Story => (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div style={{ margin: "3em" }}>
                <Story />
            </div>
        </ThemeProvider>
    ),
];
