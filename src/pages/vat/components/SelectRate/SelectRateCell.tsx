import { formatDisplayedValue } from "@helpers/formatDisplayedValue";
import { Box, SelectChangeEvent, TableCell } from "@mui/material";
import React, { FC, useState } from "react";
import SelectRate from "./SelectRate";
import VatRateButtons from "./VatRateButtons";

const Cell: FC<{
    children: number;
    index: number;
    width: number;
    getSelectValue: (rate: string, index: number) => void;
}> = ({ children, index, width, getSelectValue }) => {
    const [select, setSelect] = useState<boolean>(false);

    const handleSwitchInput = () => setSelect(!select);

    const onChange = (event: SelectChangeEvent<string>) =>
        getSelectValue(event.target.value, index);

    const cellDisplayValue = formatDisplayedValue(children);

    return (
        <>
            {select ? (
                <TableCell
                    align="center"
                    sx={{
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
                        <SelectRate
                            value={children.toString()}
                            width={width}
                            onChange={onChange}
                        />
                        <VatRateButtons
                            handleSwitchInput={handleSwitchInput}
                        ></VatRateButtons>
                    </Box>
                </TableCell>
            ) : (
                <TableCell
                    onClick={handleSwitchInput}
                    align="center"
                    sx={{
                        "&:hover": { cursor: "pointer" },
                        width: width,
                    }}
                >
                    {cellDisplayValue}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
