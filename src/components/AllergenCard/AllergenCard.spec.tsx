import React from "react";
import { render, screen } from "test-utils";

import { AllergenCard } from "./index";
import type { AllergenCardProps } from "./index";

const testProps: AllergenCardProps = {
    allergenName: "Peanuts",
    containingFoods: ["dhoog"],
    linkPath: "afghanistan",
};

describe("AllergenCard", () => {
    describe("When the AllergenCard component mounts", () => {
        beforeEach(() => render(<AllergenCard {...testProps} />));

        it("It renders correctly", () => {
            expect(screen.getByTestId("allergen-card-link")).toBeInTheDocument();
        });
        it("The correct allergen name is diplayed", () => {
            expect(screen.getByTestId("allergen-card-link")).toContainHTML(
                "Afghanistan"
            );
        });
        it("The correct flag is diplayed", () => {
            expect(screen.getByTestId("userEmailAddress")).toContainHTML("🇦🇫");
        });
    });
});
