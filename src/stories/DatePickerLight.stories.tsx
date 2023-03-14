import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePicker from "@sharedcomponents/DatePicker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getDesignTokens } from "@themes/themes";
import React from "react";

const light = createTheme(getDesignTokens("light"));

export default {
    title: "Shared/DatePicker/DatePickerLight",
    component: DatePicker,
    decorators: [
        (Story) => <ThemeProvider theme={light}>{<Story />}</ThemeProvider>,
    ],
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: "dark", value: "#1E1E1E" },
                { name: "light", value: "#F8F8F8" },
            ],
        },
    },
    argTypes: {
        value: {
            type: "string",
            description: "Date formatted 2022-11-30",
        },
        error: {
            type: "boolean",
            description: "If error, border-color red, otherwise - blue",
        },
        onChange: {
            type: "function",
            description: "Function recieves Dayjs | null argument type",
        },
        onKeyDown: {
            type: "function",
            description: "Function handle keystroke",
        },
    },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
    return <DatePicker {...args} />;
};
export const Primary = Template.bind({});
Primary.args = {
    value: "2022-11-30",
    error: false,
};
