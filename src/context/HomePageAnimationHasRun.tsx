import React, { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { SimpleProviderProps } from "./types";

type HomePageAnimationHasRunContextValue = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

/**
 * Global context for if the PeanutPlanet animation has run this session
 */
export const HomePageAnimationHasRunContext =
  createContext<HomePageAnimationHasRunContextValue | null>(null);

/**
 * Global context provider for if the PeanutPlanet animation has run this session
 */
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

/**
 * Global context reciever hook for if the PeanutPlanet animation has run this session
 */
export const useHomePageAnimationHasRunContext =
  (): HomePageAnimationHasRunContextValue => {
    const value = useContext(HomePageAnimationHasRunContext);

    if (value === null) {
      throw new Error("UnitSystemContext was used before it was initialised");
    }

    return value;
  };
