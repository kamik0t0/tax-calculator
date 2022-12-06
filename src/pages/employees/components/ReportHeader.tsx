import { Box, DialogContentText, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React, { useMemo } from "react";
import { ReportHeaderColsWrapper } from "../exports/components";
import { useEmployeeSelectors } from "../exports/hooks";
import { getBirth, getSex } from "../exports/utils";

const ReportHeader: React.FC<{}> = (props) => {
    const { employeeId } = useTypedSelector((state) => state.dialogSlice);
    const { selectEmployeeById } = useEmployeeSelectors();
    const employee = selectEmployeeById(employeeId);

    const birth = useMemo(() => getBirth(employee?.birth), [employee]);
    const sex = useMemo(() => getSex(employee?.sex), [employee]);
    return (
        <>
            {employee?.id && (
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
