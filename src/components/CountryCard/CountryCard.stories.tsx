import React from "react";
import type { Story, Meta } from "@storybook/react";

import { CountryCard } from "./index";
import type { CountryCardProps } from "./index";

export default {
  title: "CountryCard",
  component: CountryCard,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: Story<CountryCardProps> = args => <CountryCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  countryName: "Afghanistan",
  countryFlag: "🇦🇫",
  linkPath: "afghanistan",
};
