import { formatDisplayedValue } from "@helpers/formatDisplayedValue";
import { Box, SelectChangeEvent, TableCell } from "@mui/material";
import React, { FC, useState } from "react";
import { SelectRate, VatRateButtons } from "../../exports/components";

const Cell: FC<{
    children: number;
    index: number;
    getSelectValue: (rate: string, index: number) => void;
}> = ({ children, index, getSelectValue }) => {
    const [select, setSelect] = useState<boolean>(false);

    const handleSwitchInput = () => setSelect(!select);

    const onChange = (event: SelectChangeEvent<string>) =>
        getSelectValue(event.target.value, index);

    const cellDisplayValue = formatDisplayedValue(children);

    return (
        <>
            {select ? (
                <TableCell variant="body" align="center">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItmes: "center",
                        }}
                    >
                        <SelectRate
                            value={children.toString()}
                            width={30}
                            onChange={onChange}
                        />
                        <VatRateButtons
                            handleSwitchInput={handleSwitchInput}
                        ></VatRateButtons>
                    </Box>
                </TableCell>
            ) : (
                <TableCell
                    variant="body"
                    onClick={handleSwitchInput}
                    align="center"
                    sx={{
                        "&:hover": { cursor: "pointer" },
                    }}
                >
                    {cellDisplayValue}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
