import { setFines } from "@finestore/fines-reducer";
import { Box, Divider } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import React from "react";
import {
    FineButton,
    FinesUserDataInputs,
    FinesUserDataType,
} from "../exports/components";

const FinesUserData: React.FC = () => {
    const dispatch = useTypedDispatch();
    const calcFines = () => dispatch(setFines());

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <FinesUserDataType />
            <Divider
                orientation="horizontal"
                variant="fullWidth"
                flexItem
                light={true}
                sx={{ mb: 2, mt: 1 }}
            />
            <FinesUserDataInputs />
            <br />
            <br />
            <FineButton onClick={calcFines} />
        </Box>
    );
};

export default FinesUserData;
