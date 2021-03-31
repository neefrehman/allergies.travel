import React, { createContext, useContext, useState } from "react";

import { useIsomorphicLayoutEffect } from "hooks/useIsomorphicLayouteffect";
import { getFromSearchParams } from "utils/getFromSearchParams";

import type { SimpleProviderProps } from "./types";

type IsDebugContextValue = boolean | null;

/** Global context for debug mode */
export const IsDebugContext = createContext<IsDebugContextValue>(null);

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

/** Global context receiver hook for debug mode */
export const useIsDebugContext = (): IsDebugContextValue => {
    const value = useContext(IsDebugContext);

    if (value === null) {
        throw new Error("IsDebugContext was used before it was initialised");
    }

    return value;
};
