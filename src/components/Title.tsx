import React from "react";

import { usePrefersReducedMotionContext } from "context/PrefersReducedMotion";
import { styled } from "stitches";

const StyledTitleContainer = styled("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "$white",
  textShadow: "0px 0px 15px #00000060",
  "& div": {
    overflowY: "hidden",
    padding: "0.2em 0",
  },
  "& h1, & p": {
    transition: "transform 3600ms cubic-bezier(0, 0.8, 0.1, 1)",
  },
  "& h1": {
    marginBottom: "0.5em",
    overflowWrap: "break-word",
    transform: "translate3d(0, 180%, 0)",
    "@media (max-width: 620px)": {
      fontSize: "2.6em",
    },
  },
  "& p": {
    fontSize: "1.42em",
    transform: "translate3d(0, -160%, 0)",
    transitionDelay: "2700ms",
  },
  variants: {
    isVisible: {
      true: {
        "& h1, & p": {
          transform: "translate3d(0, 0, 0)",
        },
      },
    },
  },
});

export const Title = ({ isVisible }: { isVisible: boolean }) => {
  const prefersReducedMotion = usePrefersReducedMotionContext();

  return (
    <StyledTitleContainer isVisible={prefersReducedMotion || isVisible}>
      <div>
        <h1>allergies.travel</h1>
      </div>
      <div>
        <p>not coming soon</p>
      </div>
    </StyledTitleContainer>
  );
};
