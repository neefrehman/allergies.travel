import React from "react";
import { styled } from "linaria/react";

import PeanutPlanet from "../../components/peanut-planet";
import Title from "./title";

import "../../styles/base.css";
import "../../styles/globals.css";

const IntroContainer = styled.div`
    background-color: #061923;
    position: relative;
`;

const HomePage = () => (
    <IntroContainer>
        <PeanutPlanet />
        <Title />
    </IntroContainer>
);

export default HomePage;
