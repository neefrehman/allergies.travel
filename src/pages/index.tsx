import React, { useState, lazy, Suspense } from "react";
import styled from "@emotion/styled";

import { Title } from "components/home/Title";
import { useHasMounted } from "hooks/useHasMounted";
import { ErrorBoundary } from "components/ErrorBoundary";

const PeanutCosmos = lazy(() => import("components/PeanutCosmos"));
// ^Fix for `cannot use import statement outside a module` issue with three/jsm: https://github.com/react-spring/react-three-fiber/discussions/504

const IntroContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.spaceNavy};
    position: relative;
    height: 100vh;
    width: 100vw;
`;

const HomePage = () => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);
    const hasMounted = useHasMounted();

    return (
        <IntroContainer>
            {hasMounted && (
                <ErrorBoundary fallback={<h1>Error</h1>}>
                    <Suspense fallback={null}>
                        <PeanutCosmos setTitleIsVisible={setTitleIsVisible} />
                        <Title isVisible={titleIsVisible} />
                    </Suspense>
                </ErrorBoundary>
            )}
        </IntroContainer>
    );
};

export default HomePage;
