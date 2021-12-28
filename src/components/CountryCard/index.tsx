import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const StyledCard = styled.div`
  display: block;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  flex-direction: column;
  padding: 2em;
  text-decoration: none;
  text-align: center;
  font-size: 1.3rem;
  position: relative;

  /* TODO: aspect-ratio? */

  a::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  > p {
    margin-top: 1em;
    font-size: 4rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

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
