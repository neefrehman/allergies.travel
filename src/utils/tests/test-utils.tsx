import React from "react";
import type { ReactNode } from "react";
import type { NextRouter } from "next/dist/next-server/lib/router/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";

import { GlobalStyles } from "../../styles/GlobalStyles";
import { theme } from "../../styles/theme";

export const routerMock: NextRouter = {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    isReady: false,
    query: {},
    push: jest.fn().mockResolvedValue(true),
    replace: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
    isFallback: false,
};

const Providers = ({ children }: { children: ReactNode }) => (
    // stylis bug still exists: https://github.com/emotion-js/emotion/issues/2103
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterContext.Provider value={routerMock}>
            {children}
        </RouterContext.Provider>
    </ThemeProvider>
);

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, "queries">
): RenderResult =>
    render(ui, {
        wrapper: Providers as React.FunctionComponent<Record<string, unknown>>,
        ...options,
    });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
