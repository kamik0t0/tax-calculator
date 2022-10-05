import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import React, { FC } from "react";
import { useSort } from "@customhooks/useSort";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { ISalary } from "../exports/interfaces";
import { SalarySortFields } from "../exports/utils";
import { updateSalaries } from "@salarystore/salary-reducer";

const TableHeader: FC<{ salary: ISalary[]; table: string }> = React.memo(
    ({ salary, table }) => {
        const dispatch = useTypedDispatch();
        const { byNumber, byString, sortOrder } = useSort(salary);

        const sortByEmployee = (
            event: React.MouseEvent<HTMLTableCellElement>
        ) =>
            dispatch(
                updateSalaries(byString(SalarySortFields.employee), table)
            );
        const sortByIndex = (event: React.MouseEvent<HTMLTableCellElement>) =>
            dispatch(updateSalaries(byString(SalarySortFields.number), table));
        const sortByTax = (event: React.MouseEvent<HTMLTableCellElement>) =>
            dispatch(updateSalaries(byNumber(SalarySortFields.tax), table));
        const sortByAccrued = (event: React.MouseEvent<HTMLTableCellElement>) =>
            dispatch(updateSalaries(byNumber(SalarySortFields.accrued), table));
        const sortByRecoupment = (
            event: React.MouseEvent<HTMLTableCellElement>
        ) =>
            dispatch(
                updateSalaries(byNumber(SalarySortFields.childrenQtty), table)
            );
        const sortByInsurance = (
            event: React.MouseEvent<HTMLTableCellElement>
        ) =>
            dispatch(
                updateSalaries(byNumber(SalarySortFields.insurance), table)
            );

        return (
            <TableHead>
                <TableRow>
                    <TableCell align="center" sx={{ width: 20 }}>
                        <Box>
                            {sortOrder ? (
                                <ArrowDownwardSharpIcon sx={{ height: 15 }} />
                            ) : (
                                <ArrowUpwardIcon sx={{ height: 15 }} />
                            )}
                        </Box>
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" }, width: 20 }}
                        onClick={sortByIndex}
                        align="center"
                    >
                        №
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" }, width: 300 }}
                        onClick={sortByEmployee}
                        align="center"
                    >
                        Сотрудник
                    </TableCell>
                    <TableCell sx={{ width: 30 }} align="center">
                        ГПХ
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" }, width: 100 }}
                        onClick={sortByAccrued}
                        align="center"
                    >
                        Начислено
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" }, width: 90 }}
                        onClick={sortByAccrued}
                        align="center"
                    >
                        К выплате
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" }, width: 60 }}
                        onClick={sortByRecoupment}
                        align="center"
                    >
                        Дети
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByTax}
                        align="center"
                    >
                        НДФЛ
                    </TableCell>
                    <TableCell
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByInsurance}
                        align="center"
                    >
                        Взносы
                    </TableCell>
                    <TableCell sx={{ width: 20 }}>Удалить</TableCell>
                </TableRow>
            </TableHead>
        );
    }
);

export default TableHeader;
