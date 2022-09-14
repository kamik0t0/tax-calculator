import { Box, Tab, Tabs as MuiTabs } from "@mui/material";
import React, { FC } from "react";
import { a11yProps } from "@utils/a11yProps";
import { TabsTables } from "../exports/utils";

const Tabs: FC<{
    value: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}> = ({ value, handleChange }) => {
    return (
        <MuiTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered={true}
            sx={{ height: 50 }}
        >
            <Tab label={TabsTables.Sale} {...a11yProps(0)} />
            <Tab label={TabsTables.Purchase} {...a11yProps(1)} />
            <Tab label={TabsTables.Received} {...a11yProps(2)} />
            <Tab label={TabsTables.Issued} {...a11yProps(3)} />
        </MuiTabs>
    );
};

export default Tabs;
