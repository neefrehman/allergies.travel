import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const StyledCard = styled.a`
    display: block;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadows.small};
    display: flex;
    flex-direction: column;
    padding: 2em;
    text-decoration: none;
    text-align: center;
    font-size: 1.3rem;

    /* TODO: aspect-ratio? */

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
    <Link href={linkPath} passHref data-testid="country-card-link">
        <StyledCard>
            <h3>{countryName}</h3>
            <p>{countryFlag}</p>
        </StyledCard>
    </Link>
);
