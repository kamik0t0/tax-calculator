import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DateCell from "@sharedcomponents/DateCell";
import { Table, TableBody, TableRow } from "@mui/material";

export default {
    title: "DateCellStory",
    component: DateCell,
} as ComponentMeta<typeof DateCell>;

const Template: ComponentStory<typeof DateCell> = (args) => (
    <Table>
        <TableBody>
            <TableRow>
                <DateCell {...args} />
            </TableRow>
        </TableBody>
    </Table>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 1669658925633,
    index: 2,
};

export const Large = Template.bind({});
Large.args = {
    children: 1669658925633,
    index: 2,
    width: 200,
};
