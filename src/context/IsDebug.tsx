import React, { createContext, useState } from "react";

import { useIsomorphicLayoutEffect } from "hooks/useIsomorphicLayouteffect";
import { getFromSearchParams } from "utils/getFromSearchParams";

import type { SimpleProviderProps } from "./types";

/** Global context for debug mode */
export const IsDebugContext = createContext(false);

/** Global context provider for debug mode */
export const IsDebugProvider = ({ children }: SimpleProviderProps) => {
    const [isDebug, setIsDebug] = useState(
        process.env.NODE_ENV === "development"
    );

    useIsomorphicLayoutEffect(() => {
        if (isDebug === true) return;

        const debugInParams = getFromSearchParams("debug");

        setIsDebug(debugInParams);
    }, [isDebug]);

    return (
        <IsDebugContext.Provider value={isDebug}>
            {children}
        </IsDebugContext.Provider>
    );
};
