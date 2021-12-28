import React from "react";
import { render, screen, composeStories } from "test-utils";

import * as stories from "./CountryCard.stories";

const { Primary } = composeStories(stories);

describe("CountryCard", () => {
  describe("When the CountryCard component mounts", () => {
    it("It renders correctly", () => {
      render(<Primary />);
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("The correct country name is displayed", () => {
      render(<Primary />);
      expect(screen.getByRole("link")).toHaveTextContent("Afghanistan");
    });

    it("The correct flag is displayed", () => {
      render(<Primary />);
      expect(screen.getByText("🇦🇫")).not.toBeNull();
    });
  });
});
