import React from "react";
import { render, screen, composeStories } from "test-utils";

import * as stories from "./CountryCard.stories";

const { Primary } = composeStories(stories);

describe("CountryCard", () => {
    describe("When the CountryCard component mounts", () => {
        beforeEach(() => render(<Primary />));

        it("It renders correctly", () => {
            expect(screen.getByRole("link")).toBeInTheDocument();
        });
        it("The correct country name is diplayed", () => {
            expect(screen.getByRole("link")).toHaveTextContent("Afghanistan");
        });
        it("The correct flag is diplayed", () => {
            expect(screen.getByRole("link")).toContainHTML("🇦🇫");
        });
    });
});
