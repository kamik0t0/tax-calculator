import { timestampToNativeToLocaleString } from "@helpers/dateHelpers";
import { Box, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";

const ShowEmployee: React.FC = () => {
    const { employee } = useTypedSelector((state) => state.salarySlice);
    const birth = employee.birth
        ? timestampToNativeToLocaleString(employee.birth)
        : "";
    const sex = employee.sex
        ? employee.sex === "male"
            ? "Мужской"
            : "Женский"
        : "";
    return (
        <Box sx={{ minWidth: 650, height: 60 }}>
            {employee && (
                <>
                    <Typography align="center">
                        {" " + employee.surname + " " + employee.name}
                    </Typography>
                    <Typography align="center">{employee?.position}</Typography>
                    <Typography align="center">{birth}</Typography>
                    <Typography align="center">{sex}</Typography>
                </>
            )}
        </Box>
    );
};

export default ShowEmployee;
