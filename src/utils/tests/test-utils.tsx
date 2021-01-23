import React from "react";
import type { ReactNode } from "react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import type { NextRouter } from "next/dist/next-server/lib/router/router";
import { render } from "@testing-library/react";
import type { RenderOptions, RenderResult } from "@testing-library/react";

import { AppProviders } from "pages/_app";

export const mockRouter: NextRouter = {
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

const Providers = ({ children }: { children?: ReactNode }) => (
    // FIXME: "stylis.middleware is not a function": https://github.com/emotion-js/emotion/issues/2103
    <AppProviders>
        <RouterContext.Provider value={mockRouter}>
            {children}
        </RouterContext.Provider>
    </AppProviders>
);

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
