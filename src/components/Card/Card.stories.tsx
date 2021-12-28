import type { Story, Meta } from "@storybook/react";

import { Card } from "./index";
import type { CardProps } from "./index";

export default {
  component: Card,
} as Meta;

export const Primary = {
  args: {
    title: "Card Title",
    children: "body",
  },
} as Story<CardProps>;

export const Square = {
  args: {
    title: "Card Title",
    children: "body",
    square: true,
  },
} as Story<CardProps>;

export const LinkBox = {
  args: {
    title: "Card Title",
    children: "body",
    linkPath: "./link-path",
  },
} as Story<CardProps>;
