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
