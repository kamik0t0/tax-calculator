import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    Button,
    Container,
    Fab,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { useSort } from "../../hooks/useSort";
import { IInvoice } from "../../interfaces/IInvoice";
import { useTypedDispatch } from "../../redux/hooks/hooks";
import { createData } from "../../scripts/createDate";
import Filter from "../Filter";
import TableContent from "./TableContent";

const makePointer = () => ({
    "&:hover": { cursor: "pointer" },
});

const BasicTable: FC<{
    invoices: IInvoice[];
    action: ActionCreatorWithPayload<IInvoice[]>;
    clientType: string;
}> = ({ invoices, action, clientType }) => {
    const dispatch = useTypedDispatch();
    const [filtered, setFiltered] = useState<IInvoice[]>(invoices || []);
    const [sort, sortOrder] = useSort(action, filtered);

    const typedSort = sort as unknown as
        | MouseEventHandler<HTMLTableCellElement>
        | undefined;

    const addRow = () => {
        const newPosition = createData("№", "Дата", "Контрагент", 0, 0, false);
        dispatch(action([...invoices, newPosition]));
    };
    const deleteRows = () =>
        dispatch(action([...invoices].filter((invoice) => !invoice.checked)));

    useEffect(() => {
        setFiltered(invoices);
    }, [invoices]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    mb: 1,
                }}
            >
                <Filter invoices={invoices} setFiltered={setFiltered} />
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Box>
                                    {sortOrder ? (
                                        <ArrowDownwardSharpIcon
                                            sx={{ height: 15 }}
                                        />
                                    ) : (
                                        <ArrowUpwardIcon sx={{ height: 15 }} />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                № п/п
                            </TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                Дата
                            </TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                {clientType}
                            </TableCell>
                            <TableCell align="center">в т.ч. НДС</TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                Сумма
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableContent
                        invoices={invoices}
                        filtered={filtered}
                        action={action}
                        clientType={clientType}
                    />
                </Table>
                <Container
                    sx={{
                        "& > :not(style)": { m: 1 },
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Fab
                        onClick={addRow}
                        color="secondary"
                        aria-label="add"
                        size="small"
                    >
                        <AddIcon />
                    </Fab>
                    <Button
                        onClick={deleteRows}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                    >
                        Удалить отмеченные
                    </Button>
                </Container>
            </TableContainer>
        </>
    );
};

export default BasicTable;
