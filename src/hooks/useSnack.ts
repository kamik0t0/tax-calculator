import { AlertColor } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { showSuccessSnackBar } from "@uistore/ui-reducer";

export const useSnack = () => {
    const dispatch = useTypedDispatch();
    const showSnack = (severity: AlertColor, message: string) =>
        dispatch(
            showSuccessSnackBar({
                open: true,
                severity: severity,
                message: message,
            })
        );
    return showSnack;
};
