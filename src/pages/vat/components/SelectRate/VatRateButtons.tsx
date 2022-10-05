import { Icon, IconButton } from "@mui/material";
import React from "react";

const VatRateButtons: React.FC<{ handleSwitchInput: () => void }> = ({
    handleSwitchInput,
}) => {
    return (
        <IconButton
            color="primary"
            aria-label="add"
            sx={{ padding: 0.4 }}
            onClick={handleSwitchInput}
        >
            <Icon color="success" fontSize="medium">
                check_circle
            </Icon>
        </IconButton>
    );
};

export default VatRateButtons;
