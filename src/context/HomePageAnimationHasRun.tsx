import React, { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { SimpleProviderProps } from "./types";

/** Global context for if the PeanutCosmos animation has run in this user session */
export const HomePageAnimationHasRunContext = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>]
>(null);

/** Global context provider for if the PeanutCosmos animation has run in this user session */
export const HomePageAnimationHasRunProvider = ({
    children,
}: SimpleProviderProps) => {
    const [HomePageAnimationHasRun, setHomePageAnimationHasRun] = useState(false);

    // If perf becoms an issue look into separating getter and setter: https://kentcdodds.com/blog/how-to-optimize-your-context-value
    return (
        <HomePageAnimationHasRunContext.Provider
            value={[HomePageAnimationHasRun, setHomePageAnimationHasRun]}
        >
            {children}
        </HomePageAnimationHasRunContext.Provider>
    );
};
