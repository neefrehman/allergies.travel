import React from "react";
import { css, Global } from "@emotion/react";

// TODO: content-visibility - https://web.dev/content-visibility/

const globalStyles = css`
    * {
        margin: 0;
    }

    html {
        height: -webkit-fill-available;
    }

    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
        margin: 0;
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
    }

    h1 {
        font-family: "Chonburi", serif;
        font-size: 4em;
    }

    p {
        font-family: monospace;
    }

    @media (max-width: 769px) {
        body {
            font-size: 16px;
        }
    }

    @media (max-width: 500px) {
        body {
            font-size: 15px;
        }
    }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
