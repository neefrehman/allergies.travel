import React from "react";
import { styled } from "linaria/react";

const StyledDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;

    div {
        overflow-y: hidden;
        padding: 0.2em 0;
    }

    h1,
    p {
        transition: transform 3800ms cubic-bezier(0, 0.8, 0.1, 1);
    }

    h1 {
        margin-bottom: 0.5em;
        overflow-wrap: break-word;
        transform: translate3d(0, 180%, 0);

        @media (max-width: 620px) {
            font-size: 2.6em;
        }
    }

    p {
        font-size: 1.42em;
        transform: translate3d(0, -160%, 0);
        transition-delay: 2700ms;
    }
`;

const Title = ({ isVisible }) => {
    const loadedStyle = isVisible
        ? { transform: "translate3d(0, 0, 0)" }
        : undefined;

    return (
        <StyledDiv>
            <div>
                <h1 style={loadedStyle}>allergies.travel</h1>
            </div>
            <div>
                <p style={loadedStyle}>not coming soon</p>
            </div>
        </StyledDiv>
    );
};

export default Title;
