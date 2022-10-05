import { SelectChangeEvent, TableCell, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import EmployeeButtons from "./EmployeeButtons";
import SelectEmployee from "./SelectEmployee";

const SelectEmployeeCell: FC<{
    children: string;
    index: number;
    width: number;
    employeeId: string;
    selectItems: any[];
    getSelectValue: (employeeId: string, index: number) => void;
}> = React.memo(
    ({ children, index, width, employeeId, selectItems, getSelectValue }) => {
        const [select, setSelect] = useState<boolean>(false);

        const handleSwitchInput = () => setSelect(!select);

        const onChange = (event: SelectChangeEvent<string>) =>
            getSelectValue(event.target.value, index);

        return (
            <>
                {select ? (
                    <TableCell
                        align="center"
                        sx={{
                            height: 31,
                            width: width,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItmes: "center",
                            }}
                        >
                            <SelectEmployee
                                children={children}
                                employees={selectItems}
                                employeeId={employeeId}
                                width={width}
                                onChange={onChange}
                            />
                            <EmployeeButtons
                                employeeId={employeeId}
                                handleSwitchInput={handleSwitchInput}
                            />
                        </Box>
                    </TableCell>
                ) : (
                    <TableCell
                        onClick={handleSwitchInput}
                        align="center"
                        sx={{
                            "&:hover": { cursor: "pointer" },
                            height: 31,
                            width: width,
                        }}
                    >
                        <Typography>{children}</Typography>
                    </TableCell>
                )}
            </>
        );
    }
);

export default SelectEmployeeCell;
