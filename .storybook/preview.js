import React from "react";

import { AppProviders } from "../src/pages/_app.page";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  Story => (
    <AppProviders>
      <div style={{ margin: "3em" }}>
        <Story />
      </div>
    </AppProviders>
  ),
];
