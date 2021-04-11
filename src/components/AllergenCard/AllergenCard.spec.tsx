import React from "react";
import { render, screen, composeStories } from "test-utils";

import * as stories from "./AllergenCard.stories";

const { Primary } = composeStories(stories);

describe("AllergenCard", () => {
    describe("When the AllergenCard component mounts", () => {
        beforeEach(() => render(<Primary />));

        it("It renders correctly", () => {
            expect(screen.getByRole("link")).toBeInTheDocument();
        });
        it("The correct allergen name is diplayed", () => {
            expect(screen.getByRole("link")).toContainHTML("afghanistan");
        });
    });
});
