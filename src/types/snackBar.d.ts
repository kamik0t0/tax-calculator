import { AlertColor } from "@mui/material/Alert";

export interface ISnackBar {
    severity: AlertColor;
    open: boolean;
    message: string;
    shouldShow?: boolean;
    dialog?: boolean;
}
