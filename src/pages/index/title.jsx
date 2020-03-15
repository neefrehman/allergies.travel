import React from "react";
import { styled } from "linaria/react";
import { useSpring, animated } from "react-spring";

import useSiteMetadata from "../../hooks/use-site-metadata";

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

    h1 {
        margin-bottom: 0.5em;
        overflow-wrap: break-word;

        @media (max-width: 620px) {
            font-size: 2.6em;
        }
    }

    p {
        font-size: 1.42em;
    }
`;

const Title = () => {
    const { siteTitle: title, siteSubtitle: subtitle } = useSiteMetadata();

    const springConfig = {
        mass: 13,
        tension: 280,
        friction: 150
    };

    const titleSpring = useSpring({
        transform: "translate3d(0, 0, 0)",
        from: { transform: "translate3d(0, 180%, 0)" },
        config: springConfig
    });

    const subtitleSpring = useSpring({
        transform: "translate3d(0, 0, 0)",
        from: { transform: "translate3d(0, -160%, 0)" },
        config: springConfig,
        delay: 2800
    });

    return (
        <StyledDiv>
            <div>
                <animated.h1 style={titleSpring}>{title}</animated.h1>
            </div>

            <div>
                <animated.p style={subtitleSpring}>{subtitle}</animated.p>
            </div>
        </StyledDiv>
    );
};

export default Title;
