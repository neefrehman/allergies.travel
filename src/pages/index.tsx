import React, { useState, lazy, Suspense, useEffect } from "react";
import { styled } from "linaria/react";

import { Title } from "components/index/Title";
import { HomepageSearchBox } from "components/index/HomepageSearchBox";

const PeanutPlanet = lazy(() => import("components/PeanutPlanet"));
// ^Fix for `cannot use import statement outside a module`: https://github.com/react-spring/react-three-fiber/discussions/504

// TODO: low-connectivity fallback
// import(navigator.connection.type === notSlow ? "../components/PeanutPlanet" : "../components/PeanutPlanet/FallbackImage")

const IntroContainer = styled.div`
    position: relative;
`;

const HomePage = () => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => setHasMounted(true), []);

    return (
        <IntroContainer>
            {hasMounted && (
                <Suspense fallback={null}>
                    <PeanutPlanet
                        titleIsVisible={titleIsVisible}
                        setTitleIsVisible={setTitleIsVisible}
                    />
                    <Title isVisible={titleIsVisible} />
                    <HomepageSearchBox isVisible={titleIsVisible} />
                </Suspense>
            )}
        </IntroContainer>
    );
};

export default HomePage;
