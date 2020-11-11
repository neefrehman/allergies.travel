import React, { useState, useEffect } from "react";
import { styled } from "linaria/react";
import { css, cx } from "linaria";

const StyledInput = styled.input`
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

    backdrop-filter: blur(0);
    background-color: rgba(0, 0, 0, 0%);
    opacity: 0;

    transition: backdrop-filter 2000ms ease-out,
        background-color 1500ms ease-out, opacity 1500ms ease-out;
    will-change: backdrop-filter; /* FIXME: terrible transitions! */

    ::placeholder {
        color: white;
    }

    :focus {
        outline: none;
    }
`;

const visibleStyles = css`
    backdrop-filter: blur(15px);
    background-color: rgba(0, 0, 0, 12%);
    opacity: 100;

    :focus {
        background-color: rgba(0, 0, 0, 20%);
    }
`;

export const HomepageSearchBox = ({ isVisible }: { isVisible: boolean }) => {
    const [isVisibleWithTimeout, setIsVisibleWithTimeout] = useState(false);
    const styles = cx(isVisibleWithTimeout && visibleStyles);

    useEffect(() => {
        const timeout =
            isVisible && setTimeout(() => setIsVisibleWithTimeout(true), 4500);
        return () => clearTimeout(timeout);
    }, [isVisible]);

    return (
        <StyledInput
            className={styles}
            placeholder="Don't search for allergens or countries..."
        />
    );
};
