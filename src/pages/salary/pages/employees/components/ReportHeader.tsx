import { timestampToNativeToLocaleString } from "@helpers/dateHelpers";
import { Box, DialogContentText, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { ReportHeaderColsWrapper } from "../exports/components";

const ReportHeader: React.FC<{}> = (props) => {
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
        <>
            {employee.id && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 1,
                        mb: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            width: 500,
                        }}
                    >
                        <DialogContentText>
                            Отчет по сотруднику:
                            {" " + employee.surname + " " + employee.name}
                        </DialogContentText>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: 500,
                            }}
                        >
                            <Typography>{employee?.position}</Typography>
                            <Typography>{birth}</Typography>
                            <Typography>{sex}</Typography>
                        </Box>
                    </Box>
                    <ReportHeaderColsWrapper />
                </Box>
            )}
        </>
    );
};

export default ReportHeader;
