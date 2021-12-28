import type { Story, Meta } from "@storybook/react";

import { AllergenCard } from "./index";
import type { AllergenCardProps } from "./index";

export default {
  component: AllergenCard,
  parameters: {
    actions: {
      argTypesRegex: "^on.*",
    },
  },
} as Meta;

export const Primary = {
  args: {
    allergenName: "Peanuts",
    containingFoods: ["dhoog"],
    linkPath: "afghanistan",
  },
} as Story<AllergenCardProps>;
