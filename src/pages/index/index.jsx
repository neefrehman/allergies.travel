import React, { useState } from "react";
import { styled } from "linaria/react";

import PeanutPlanet from "../../components/peanut-planet";

import Title from "./title";

import "../../styles/base.css";
import "../../styles/globals.css";

const IntroContainer = styled.div`
    background-color: #061923;
    position: relative;
`;

const HomePage = () => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);
    const startTitleAnimation = () => setTitleIsVisible(true);

    return (
        <IntroContainer>
            <PeanutPlanet
                titleIsVisible={titleIsVisible}
                startTitleAnimation={startTitleAnimation}
            />
            {titleIsVisible && <Title />}
        </IntroContainer>
    );
};

export default HomePage;
