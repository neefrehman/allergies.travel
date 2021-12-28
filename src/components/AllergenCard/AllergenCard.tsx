import React from "react";
import Link from "next/link";

import { styled } from "stitches";

const StyledCard = styled("div", {
  borderRadius: "$large",
  boxShadow: "$small",
  display: "flex",
  flexDirection: "column",
  padding: "2em",
  textDecoration: "none",
  textAlign: "center",
  fontSize: "1.3rem",
  /* TODO: aspect-ratio? */
  "& > p": {
    mt: "1em",
    fontSize: "4rem",
  },
  "& :hover": {
    textDecoration: "underline",
  },
});

export interface AllergenCardProps {
  allergenName: string;
  containingFoods: string[];
  linkPath: string;
}

export const AllergenCard = ({
  allergenName,
  containingFoods,
  linkPath,
}: AllergenCardProps) => (
  <Link href={linkPath} passHref>
    <StyledCard>
      <h3>{allergenName}</h3>
      <p>
        found in{" "}
        {containingFoods.map(food => (
          <span key="food">{food}</span>
        ))}
      </p>
    </StyledCard>
  </Link>
);
