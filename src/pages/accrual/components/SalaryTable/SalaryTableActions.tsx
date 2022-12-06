import { Box, Button } from "@mui/material";
import React from "react";
import { ISalary } from "../../exports/interfaces";
import { useSalaryActions } from "../../exports/hooks";
import { Months } from "../../exports/utils";

const SalaryTableActions: React.FC<{ salary: ISalary[]; table: Months }> = ({
    salary,
    table,
}) => {
    const [fillByPrevios, recalculate] = useSalaryActions(salary, table);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <Button variant="outlined" onClick={fillByPrevios}>
                Заполнить
            </Button>
            <Button variant="outlined" onClick={recalculate}>
                Рассчитать
            </Button>
        </Box>
    );
};

export default SalaryTableActions;
