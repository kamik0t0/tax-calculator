import { Button } from "@mui/material";
import React from "react";

const FineButton: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
    return (
        <Button
            size="medium"
            variant="contained"
            onClick={onClick}
            sx={{
                width: "150px",
                alignSelf: "center",
            }}
        >
            Рассчитать
        </Button>
    );
};

export default FineButton;
