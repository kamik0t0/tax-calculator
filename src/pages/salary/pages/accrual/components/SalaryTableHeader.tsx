import { useSort } from "@customhooks/useSort";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalaries } from "@salarystore/salary-reducer";
import React, { FC } from "react";
import { ISalary } from "../exports/interfaces";
import { SalarySortFields } from "../exports/utils";

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
                    <TableCell variant="head" align="center" width={60}>
                        <Box>
                            {sortOrder ? (
                                <ArrowDownwardSharpIcon sx={{ height: 15 }} />
                            ) : (
                                <ArrowUpwardIcon sx={{ height: 15 }} />
                            )}
                        </Box>
                    </TableCell>
                    <TableCell
                        variant="head"
                        width={55}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByIndex}
                        align="center"
                    >
                        №
                    </TableCell>
                    <TableCell
                        variant="head"
                        width={360}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByEmployee}
                        align="center"
                    >
                        Сотрудник
                    </TableCell>
                    <TableCell variant="head" width={72} align="center">
                        ГПХ
                    </TableCell>
                    <TableCell
                        variant="head"
                        width={124}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByAccrued}
                        align="center"
                    >
                        Начислено
                    </TableCell>
                    <TableCell
                        variant="head"
                        width={120}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByAccrued}
                        align="center"
                    >
                        К выплате
                    </TableCell>
                    <TableCell
                        width={85}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={sortByRecoupment}
                        align="center"
                    >
                        Дети
                    </TableCell>
                    <TableCell
                        width={108}
                        sx={{
                            "&:hover": { cursor: "pointer" },
                        }}
                        onClick={sortByTax}
                        align="center"
                    >
                        НДФЛ
                    </TableCell>
                    <TableCell
                        variant="head"
                        width={111}
                        sx={{
                            "&:hover": { cursor: "pointer" },
                        }}
                        onClick={sortByInsurance}
                        align="center"
                    >
                        Взносы
                    </TableCell>
                    <TableCell width={95} variant="head">
                        Удалить
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
);

export default TableHeader;
