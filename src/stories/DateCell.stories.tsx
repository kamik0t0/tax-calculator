import DateCell from "@sharedcomponents/DateCell";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
    title: "Shared/DateCellStory",
    component: DateCell,
} as ComponentMeta<typeof DateCell>;

const Template: ComponentStory<typeof DateCell> = (args) => (
    <DateCell {...args} />
);

const getDate = (date: number) => {
    console.log(date);
};

export const Primary = Template.bind({});
Primary.args = {
    children: 1669658925633,
    index: 2,
    getDate,
};

export const Large = Template.bind({});
Large.args = {
    children: 1669658925633,
    index: 2,
    width: 200,
};
