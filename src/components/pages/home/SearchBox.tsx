import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledInput = styled.input<{ isVisible: boolean }>`
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: white;
    font-family: monaco;
    text-indent: 24px;
    width: 500px;
    height: 70px;
    border: none;
    border-radius: 20px;
    backdrop-filter: 15px; /* removed transition as it was very jarring, even with will-change. Maybe try again once browsers are more used to the property? */
    transition: background-color 1500ms ease-out, opacity 1500ms ease-out;

    ${({ isVisible }) => css`
        opacity: ${isVisible ? 100 : 0};
        background-color: rgba(0, 0, 0, ${isVisible ? "12%" : "0%"});
    `}

    ::placeholder {
        color: white;
    }

    :focus {
        background-color: rgba(0, 0, 0, 20%);
        outline: none;
    }
`;

export const HomepageSearchBox = ({ isVisible }: { isVisible: boolean }) => {
    const [isVisibleWithTimeout, setIsVisibleWithTimeout] = useState(false);

    useEffect(() => {
        const timeout =
            isVisible && setTimeout(() => setIsVisibleWithTimeout(true), 4500);
        return () => clearTimeout(timeout);
    }, [isVisible]);

    return (
        <StyledInput
            isVisible={isVisibleWithTimeout}
            placeholder="Don't search for allergens or countries..."
        />
    );
};
