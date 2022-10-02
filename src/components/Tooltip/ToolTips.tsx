import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function PositionedTooltips() {
    return (
        <Box sx={{ width: 500 }}>
            <Tooltip title="Add" placement="right">
                <Button>right</Button>
            </Tooltip>
        </Box>
    );
}
