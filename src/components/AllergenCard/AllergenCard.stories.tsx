import React from "react";
import type { Story, Meta } from "@storybook/react";

import { AllergenCard } from "./index";
import type { AllergenCardProps } from "./index";

export default {
  title: "AllergenCard",
  component: AllergenCard,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: Story<AllergenCardProps> = args => <AllergenCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  allergenName: "Peanuts",
  containingFoods: ["dhoog"],
  linkPath: "afghanistan",
};
