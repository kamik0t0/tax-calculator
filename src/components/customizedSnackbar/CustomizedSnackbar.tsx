import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import * as React from "react";
import { FC } from "react";
import { showSuccessSnackBar } from "@uistore/ui-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar: FC = () => {
    const dispatch = useTypedDispatch();
    const { severity, open, message } = useTypedSelector(
        (state) => state.snackBarSlice
    );

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(
            showSuccessSnackBar({
                open: false,
                severity: severity,
                message: message,
            })
        );
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default CustomizedSnackbar;

/* "error" "warning" "info" "success"*/
