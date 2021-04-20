/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import type { ReactNode } from "react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import type { NextRouter } from "next/dist/next-server/lib/router/router";
import { render } from "@testing-library/react";
import type { RenderOptions, RenderResult } from "@testing-library/react";

import { getTranslationStrings } from "data/fetchers";
import { createTranslator } from "utils/i18n/createTranslator";

const mockRouter: NextRouter = {
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
    events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
    isFallback: false,
    isLocaleDomain: false,
    isPreview: false,
};

const Providers = ({ children }: { children?: ReactNode }) => (
    <RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>
);

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: Providers, ...options });

const t = createTranslator(getTranslationStrings({ locale: "en" }));

export * from "@testing-library/react";
export { composeStories } from "@storybook/testing-react";
export { customRender as render, t };
