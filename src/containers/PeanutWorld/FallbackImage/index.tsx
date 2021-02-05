import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import { useHasMounted } from "hooks/useHasMounted";
import { useTimeout } from "hooks/useTimeout";

import type { PeanutWorldProps } from "..";

import imageSrc from "./img.jpeg";

const FallbackImageContainer = styled.div<{ zoomed: boolean }>`
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
        object-fit: cover;
        transition: transform 2000ms, opacity 2000ms;
        transform: scale(${({ zoomed }) => (zoomed ? 1.07 : 1)});
        opacity: ${({ zoomed }) => (zoomed ? 1 : 0)};
    }
`;

const FallbackImage = ({ setTitleIsVisible }: PeanutWorldProps) => {
    const hasMounted = useHasMounted(); // TODO: test zoomed={hasMounted} - this is sometimes fully zoomed by the time the image loads

    useTimeout(() => setTitleIsVisible(true), 2500);

    return (
        <FallbackImageContainer zoomed={hasMounted}>
            <Image layout="fill" src={imageSrc} />
        </FallbackImageContainer>
    );
};

// Default export required for simple dynamic importing
export default FallbackImage;