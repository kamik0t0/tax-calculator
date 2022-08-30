import { Box, Link } from "@mui/material";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkRouter: FC<{ children: React.ReactElement; path: string }> = ({
    children,
    path,
}) => {
    return (
        <Box sx={{ typography: "body1" }}>
            <Link underline="none" component={RouterLink} to={path}>
                {children}
            </Link>
        </Box>
    );
};

export default LinkRouter;
