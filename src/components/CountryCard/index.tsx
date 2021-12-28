import React from "react";
import Link from "next/link";

import { styled } from "stitches";

const StyledCard = styled("div", {
  borderRadius: "10px",
  boxShadow: "$small",
  display: "flex",
  flexDirection: "column",
  padding: "2em",
  textDecoration: "none",
  textAlign: "center",
  fontSize: "1.3rem",
  position: "relative",

  /* TODO: aspect-ratio? */

  "a::after": {
    content: "",
    position: "absolute",
    inset: 0,
  },

  "& > p": {
    mt: "1em",
    fontSize: "4rem",
  },

  "&:hover": {
    textDecoration: "underline",
  },
});

export interface CountryCardProps {
  countryName: string;
  countryFlag: string;
  linkPath: string;
}

export const CountryCard = ({
  countryName,
  countryFlag,
  linkPath,
}: CountryCardProps) => (
  <StyledCard>
    <h3>
      <Link href={linkPath}>
        <a>{countryName}</a>
      </Link>
    </h3>
    <p>{countryFlag}</p>
  </StyledCard>
);
