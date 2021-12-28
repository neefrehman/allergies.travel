import type { Story, Meta } from "@storybook/react";

import { CountryCard } from "./index";
import type { CountryCardProps } from "./index";

export default {
  component: CountryCard,
  parameters: {
    actions: {
      argTypesRegex: "^on.*",
    },
  },
} as Meta;

export const Primary = {
  args: {
    countryName: "Afghanistan",
    countryFlag: "🇦🇫",
    linkPath: "afghanistan",
  },
} as Story<CountryCardProps>;
