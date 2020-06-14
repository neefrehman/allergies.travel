import React from "react";
import { AppProps } from "next/app";
import { css } from "linaria";

const App = ({ Component, pageProps }: AppProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...pageProps} />
);

export default App;

export const globalStyles = css`
    :global() {
        * {
            margin: 0;
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
    }
`;
