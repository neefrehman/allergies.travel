import React, { useState, useEffect } from "react";

import { styled } from "stitches";

const StyledInput = styled("input", {
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "$white",
  fontFamily: "monaco",
  textIndent: "24px",
  width: "500px",
  height: "70px",
  border: "none",
  borderRadius: "20px",
  backdropFilter: "15px", // removed transition on this as it was very jarring, even with will-change. Maybe try again once browsers are more used to the property?,
  transition: "background-color 1500ms ease-out, opacity 1500ms ease-out",
  "&::placeholder": {
    color: "$white",
  },
  "&:focus": {
    backgroundColor: "rgba(0, 0, 0, 20%)",
    outline: "none",
  },
  variants: {
    isVisible: {
      true: {
        opacity: "100",
        backgroundColor: `rgba(0, 0, 0, "12%"})`,
      },
    },
  },
});

export const HomepageSearchBox = ({ isVisible }: { isVisible: boolean }) => {
  const [isVisibleWithTimeout, setIsVisibleWithTimeout] = useState(false);

  useEffect(() => {
    const timeout =
      isVisible && setTimeout(() => setIsVisibleWithTimeout(true), 4500);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible]);

  return (
    <StyledInput
      isVisible={isVisibleWithTimeout}
      placeholder="Don't search for allergens or countries..."
    />
  );
};
