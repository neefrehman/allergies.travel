import React from "react";

import { Card } from "components/Card";
import { styled } from "stitches";

const StyledFlag = styled("p", {
  marginTop: "1em",
  fontSize: "4rem",
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
  <Card linkPath={linkPath} title={countryName}>
    <StyledFlag aria-label={`The flag of ${countryName}`}>{countryFlag}</StyledFlag>
  </Card>
);
