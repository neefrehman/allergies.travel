import React from "react";
import { styled } from "linaria/react";

import PeanutPlanet from "../components/peanut-planet";
import "../styles/globals.css";

const StyledHeader = styled.header`
    background-color: #061923;
`;

const HomePage = () => (
    <StyledHeader>
        <PeanutPlanet />
    </StyledHeader>
);

export default HomePage;
