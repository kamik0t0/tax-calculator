import { addRow, deleteRows } from "@invoicesstore/invoice-reducer";
import {
    Box,
    Paper,
    Stack,
    Table,
    TableContainer,
    useTheme,
} from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import LastRow from "@sharedcomponents/LastRow";
import React, { FC, useEffect, useState } from "react";
import { Filter, TableContent, TableHeader } from "../exports/components";
import { IInvoice } from "../exports/interfaces";
import { newInvoice } from "../exports/scripts";
import { useScrollToLastRow } from "@customhooks/useScrollToLastRow";

const InvoiceTable: FC<{
    invoices: IInvoice[];
    clientType: string;
    table: string;
}> = ({ invoices, clientType, table }) => {
    const theme = useTheme();
    const elevation = theme.palette.mode === "dark" ? 10 : 1;
    const dispatch = useTypedDispatch();
    const [filtered, setFiltered] = useState<IInvoice[]>(invoices || []);
    const setConteinerHeight = useScrollToLastRow("lastRow");

    const createInvoice = () => {
        setConteinerHeight(1);
        dispatch(addRow(newInvoice, table));
    };
    const deleteInvoices = () => dispatch(deleteRows(table));

    useEffect(() => {
        setFiltered(invoices);
    }, [invoices]);

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: 1 }}>
                    <Filter invoices={invoices} setFiltered={setFiltered} />
                    <Paper
                        component="div"
                        sx={{
                            width: "100%",
                            overflowY: "auto",
                            overflowX: "hidden",
                        }}
                        elevation={elevation}
                    >
                        <TableContainer sx={{ maxHeight: 570 }}>
                            <Table
                                stickyHeader
                                size="small"
                                aria-label="a dense table"
                                id="InvoiceTable"
                            >
                                <TableHeader
                                    clientType={clientType}
                                    filtered={filtered}
                                    table={table}
                                />
                                <TableContent
                                    filtered={filtered}
                                    table={table}
                                />
                            </Table>
                            <LastRow
                                createItem={createInvoice}
                                deleteItem={deleteInvoices}
                            />
                        </TableContainer>
                    </Paper>
                </Box>
            </Stack>
        </>
    );
};

export default InvoiceTable;
