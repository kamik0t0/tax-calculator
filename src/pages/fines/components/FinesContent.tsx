import { Divider, Stack } from "@mui/material";
import React from "react";
import { FinesResult, FinesUserData } from "../exports/components";

const FinesContent: React.FC = (props) => {
    return (
        <Stack
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                mb: 10,
            }}
        >
            <FinesUserData />
            <Divider
                orientation="vertical"
                variant="fullWidth"
                flexItem
                light={true}
            />
            <FinesResult />
        </Stack>
    );
};

export default FinesContent;
