import React from "react";
import { render, screen, composeStories } from "test-utils";

import * as stories from "./Card.stories";

const { Primary, LinkBox } = composeStories(stories);

describe("Card", () => {
  describe("When the Card component mounts", () => {
    it("It renders correctly", () => {
      render(<Primary />);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  describe("When the LinkBox variant mounts", () => {
    it("The correct link is rendered", () => {
      render(<LinkBox />);
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/link-path");
    });
  });
});
