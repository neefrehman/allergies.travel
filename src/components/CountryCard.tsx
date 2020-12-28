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

    > p {
        margin-top: 1em;
        font-size: 4rem;
    }

    &:hover {
        text-decoration: underline;
    }
`;

interface CountryCardProps {
    name: string;
    flag: string;
    slug: string;
}

export const CountryCard = ({ name, flag, slug }: CountryCardProps) => (
    <li>
        <Link href={slug} passHref>
            <StyledCard>
                <h3>{name}</h3>
                <p>{flag}</p>
            </StyledCard>
        </Link>
    </li>
);
