import React, { useState } from "react";
import { styled } from "linaria/react";

import PeanutPlanet from "./components/PeanutPlanet";
import Title from "./components/Title";

const IntroContainer = styled.div`
    background-color: #061923;
    position: relative;
`;

const HomePage = () => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);

    return (
        <IntroContainer>
            <PeanutPlanet
                titleIsVisible={titleIsVisible}
                setTitleIsVisible={setTitleIsVisible}
            />
            <Title isVisible={titleIsVisible} />
        </IntroContainer>
    );
};

export default HomePage;
