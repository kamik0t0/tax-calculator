import { SelectChangeEvent, TableCell, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import EmployeeButtons from "./EmployeeButtons";
import SelectEmployee from "./SelectEmployee";

const SelectEmployeeCell: FC<{
    children: string;
    index: number;
    employeeId: string;
    selectItems: any[];
    getSelectValue: (employeeId: string, index: number) => void;
}> = React.memo(
    ({ children, index, employeeId, selectItems, getSelectValue }) => {
        const [select, setSelect] = useState<boolean>(false);

        const handleSwitchInput = () => setSelect(!select);

        const onChange = (event: SelectChangeEvent<string>) =>
            getSelectValue(event.target.value, index);

        return (
            <>
                {select ? (
                    <TableCell
                        variant="body"
                        align="center"
                        sx={{
                            height: 31,
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
                        variant="body"
                        onClick={handleSwitchInput}
                        align="center"
                        sx={{
                            "&:hover": { cursor: "pointer" },
                            height: 31,
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
