import React, { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { SimpleProviderProps } from "./types";

type HomePageAnimationHasRunContextValue = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

export const HomePageAnimationHasRunContext =
  createContext<HomePageAnimationHasRunContextValue | null>(null);

export const HomePageAnimationHasRunProvider = ({
  children,
}: SimpleProviderProps) => {
  const [HomePageAnimationHasRun, setHomePageAnimationHasRun] = useState(false);

  // If perf becomes an issue look into separating getter and setter: https://kentcdodds.com/blog/how-to-optimize-your-context-value
  return (
    <HomePageAnimationHasRunContext.Provider
      value={[HomePageAnimationHasRun, setHomePageAnimationHasRun]}
    >
      {children}
    </HomePageAnimationHasRunContext.Provider>
  );
};

export const useHomePageAnimationHasRunContext =
  (): HomePageAnimationHasRunContextValue => {
    const value = useContext(HomePageAnimationHasRunContext);

    if (value === null) {
      throw new Error("UnitSystemContext was used before it was initialised");
    }

    return value;
  };
