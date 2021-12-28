import React from "react";
import Image from "next/image";

import { useHasMounted } from "hooks/useHasMounted";
import { useTimeout } from "hooks/useTimeout";
import { styled } from "stitches";

import type { PeanutWorldProps } from "..";

import imageSrc from "./img.jpeg";

const FallbackImageContainer = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  "& img": {
    objectFit: "cover",
    transition: "transform 2000ms, opacity 2000ms",
    transform: "scale(1)",
    opacity: 0,
  },

  variants: {
    zoomed: {
      true: {
        transform: "scale(1.07)",
        opacity: 1,
      },
    },
  },
});

const FallbackImage = ({ setTitleIsVisible }: PeanutWorldProps) => {
  const hasMounted = useHasMounted(); // TODO: test zoomed={hasMounted} - this is sometimes fully zoomed by the time the image loads

  useTimeout(() => setTitleIsVisible(true), 2500);

  return (
    <FallbackImageContainer zoomed={hasMounted}>
      <Image layout="fill" src={imageSrc} />
    </FallbackImageContainer>
  );
};

export default FallbackImage; // Default export required for simple dynamic importing
