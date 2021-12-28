import { useEffect } from "react";

/** A wrpper around `setTimeout` that handles invocation and cleanup */
export const useTimeout = (
  callback: (...args: never[]) => void,
  timeout: number
) => {
  useEffect(() => {
    const timeoutFunction: ReturnType<typeof setTimeout> = setTimeout(
      () => callback(),
      timeout
    );

    return () => clearTimeout(timeoutFunction);
  }, [callback, timeout]);
};
