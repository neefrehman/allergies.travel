import React from "react";
import { render, screen } from "test-utils";

import { CountryCard } from "./index";
import type { CountryCardProps } from "./index";

const testProps: CountryCardProps = {
    name: "Afghanistan",
    flag: "🇦🇫",
    slug: "afghanistan",
};

describe("CountryCard", () => {
    describe("When the CountryCard component mounts", () => {
        beforeEach(() => render(<CountryCard {...testProps} />));

        it("It renders correctly", () => {
            expect(screen.getByTestId("country-card-link")).toBeInTheDocument();
        });
        it("The correct country name is diplayed", () => {
            expect(screen.getByTestId("country-card-link")).toContainHTML(
                "Afghanistan"
            );
        });
        it("The correct flag is diplayed", () => {
            expect(screen.getByTestId("userEmailAddress")).toContainHTML("🇦🇫");
        });
    });
});
