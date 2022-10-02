import { Box, Switch } from "@mui/material";
import React from "react";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { shouldShowTips } from "@uistore/ui-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import Tooltip from "@mui/material/Tooltip";

const SnackSwitcher: React.FC = (props) => {
    const dispatch = useTypedDispatch();
    const { shouldShow } = useTypedSelector((state) => state.snackBarSlice);
    const showTipsHandler = () => {
        dispatch(shouldShowTips(!shouldShow));
    };
    return (
        <Tooltip title="Уведомления" placement="right" enterDelay={300}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 8,
                    mr: 2,
                    width: 75,
                }}
            >
                {shouldShow ? (
                    <TipsAndUpdatesIcon />
                ) : (
                    <TipsAndUpdatesOutlinedIcon />
                )}
                <Switch
                    color="default"
                    sx={{
                        ml: 1,
                    }}
                    onClick={showTipsHandler}
                />
            </Box>
        </Tooltip>
    );
};

export default SnackSwitcher;
