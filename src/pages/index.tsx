import React, { useState, lazy, Suspense } from "react";
import styled from "@emotion/styled";

import { Title } from "components/home/Title";
import { useHasMounted } from "hooks/useHasMounted";

const PeanutPlanet = lazy(() => import("components/PeanutPlanet"));
// ^Fix for `cannot use import statement outside a module` issue with three/jsm: https://github.com/react-spring/react-three-fiber/discussions/504

// TODO low-connectivity fallback:
// import(navigator.connection.type === notSlow ? "../components/PeanutPlanet" : "../components/PeanutPlanet/FallbackImage")

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
                <Suspense fallback={null}>
                    <PeanutPlanet setTitleIsVisible={setTitleIsVisible} />
                    <Title isVisible={titleIsVisible} />
                </Suspense>
            )}
        </IntroContainer>
    );
};

export default HomePage;
