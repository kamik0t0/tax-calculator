import React from "react";
import { addDecorator } from "@storybook/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDesignTokens } from "@themes/themes";

const theme = createTheme(getDesignTokens("dark"));

export const decorators = [
    (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        values: [
            { name: "dark", value: "#1E1E1E" },
            { name: "light", value: "#F8F8F8" },
        ],
    },
};
