import * as React from "react";
import Slider, { SliderProps } from "@mui/material/Slider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

const MyTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    width: 200,
    color: theme.palette.success.light,
    paddingY: 2,
    // "& :hover": { cursor: "pointer" },
    "&.MuiTextField-root": {
        paddingY: "1px",
    },

    // "& .MuiSlider-thumb": {
    //     "&:hover, &.Mui-focusVisible": {
    //         boxShadow: `0px 0px 0px 8px ${alpha(
    //             theme.palette.success.main,
    //             0.16
    //         )}`,
    //     },
    //     "&.Mui-active": {
    //         boxShadow: `0px 0px 0px 14px ${alpha(
    //             theme.palette.success.main,
    //             0.16
    //         )}`,
    //     },
    // },
}));

export default function StyledCustomization() {
    return <MyTextField defaultValue={30} />;
}
