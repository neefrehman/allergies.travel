import React, { useState } from "react";
import { styled } from "linaria/react";

import PeanutPlanet from "./peanut-planet";
import Title from "./title";

import "../../styles/base.css";
import "../../styles/globals.css";

const IntroContainer = styled.div`
    background-color: #061923;
    position: relative;
`;

const HomePage = () => {
    const [dollyHasFinished, setDollyHasFinished] = useState(false);
    const finishDolly = () => setDollyHasFinished(true);

    return (
        <IntroContainer>
            <PeanutPlanet
                dollyHasFinished={dollyHasFinished}
                setDollyHasFinished={finishDolly}
            />
            {dollyHasFinished && <Title />}
        </IntroContainer>
    );
};

export default HomePage;
