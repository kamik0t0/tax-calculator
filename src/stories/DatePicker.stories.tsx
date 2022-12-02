import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DatePicker from "@sharedcomponents/DatePicker";

export default {
    title: "DatePickerStory",
    component: DatePicker,
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
        focus: {
            type: "boolean",
            description: "Input date focus",
        },
        onKeyDown: {
            type: "function",
            description: "Function handle keystroke",
        },
        width: {
            type: "number",
            description: "Set date input length",
            options: [100, 150],
            control: {
                type: "radio",
            },
        },
    },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
    <DatePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    value: "2022-11-30",
    error: false,
    // focus: false,
};
