import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import React, { FC } from "react";
import { makePointer } from "../../../utils/malePointer";
import { useSort } from "../../../hooks/useSort";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { updateSalaries } from "../../../redux/reducers/salary/salary-reducer";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import { ISalary } from "../interfaces/ISalary";
import { SalarySortFields } from "../utils/sortFields";

const TableHeader: FC<{ salary: ISalary[]; table: string }> = ({
    salary,
    table,
}) => {
    const dispatch = useTypedDispatch();
    const { byNumber, byString, sortOrder } = useSort(salary);

    const sortByEmployee = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byString(SalarySortFields.employee), table));
    const sortByIndex = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byString(SalarySortFields.number), table));
    const sortByTax = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byNumber(SalarySortFields.tax), table));
    const sortByAccrued = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byNumber(SalarySortFields.accrued), table));
    const sortByRecoupment = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(
            updateSalaries(byNumber(SalarySortFields.childrenQtty), table)
        );
    const sortByInsurance = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byNumber(SalarySortFields.insurance), table));

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">
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
                    sx={{ "&:hover": { cursor: "pointer" }, width: 650 }}
                    onClick={sortByEmployee}
                    align="center"
                >
                    Сотрудник
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 200 }}
                    onClick={sortByAccrued}
                    align="center"
                >
                    Начислено
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 200 }}
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
                    sx={{ "&:hover": { cursor: "pointer" }, width: 200 }}
                    onClick={sortByTax}
                    align="center"
                >
                    НДФЛ
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 200 }}
                    onClick={sortByInsurance}
                    align="center"
                >
                    Взносы
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
