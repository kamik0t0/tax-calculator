import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputCell from "@sharedcomponents/InputCell";

export default {
    title: "Shared/InputCell",
    component: InputCell,
    decorators: [(Story) => <Story />],
    argTypes: {
        backgroundColor: { control: "#020202" },
        children: {
            type: "string",
            description: "Date formatted 2022-11-30",
            options: ["string", "number"],
            control: {
                type: "radio",
            },
        },
        index: {
            type: "number",
            description: "Index",
        },
        getInputData: {
            type: "function",
            description: "Function recieves value",
        },
        type: {
            type: "string",
            description: "Input type",
            options: ["string", "number"],
            control: {
                type: "radio",
            },
        },
        prop: {
            type: "string",
            description: "Column of the table as object prop",
            options: ["number", "client", "nds", "summ"],
            control: {
                type: "select",
            },
        },
        isMoney: {
            type: "boolean",
            description: "Set date input length",
            options: ["true", "false"],
            control: {
                type: "radio",
            },
        },
    },
    parameters: {
        backgrounds: {
            values: [{ name: "black", value: "#020202" }],
        },
    },
} as ComponentMeta<typeof InputCell>;

const Template: ComponentStory<typeof InputCell> = (args) => (
    <InputCell {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    isMoney: true,
};
