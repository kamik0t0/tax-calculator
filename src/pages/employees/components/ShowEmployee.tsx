import { Box, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React, { memo, useMemo } from "react";
import { getBirth, getSex } from "../exports/utils";
import { useEmployeeSelectors } from "../hooks/useEmployeeSelectors";

const ShowEmployee: React.FC = memo(() => {
    const { employeeId } = useTypedSelector((state) => state.dialogSlice);
    const { selectEmployeeById } = useEmployeeSelectors();
    const employee = selectEmployeeById(employeeId);

    const birth = useMemo(() => getBirth(employee?.birth), [employee]);
    const sex = useMemo(() => getSex(employee?.sex), [employee]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                minWidth: 650,
                height: 30,
                mt: 2,
            }}
        >
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
});

export default ShowEmployee;
