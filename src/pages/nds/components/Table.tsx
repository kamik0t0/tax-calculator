import { addRow, deleteRows } from "@invoicesstore/invoice-reducer";
import { Box, Paper, Stack, Table, TableContainer } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import LastRow from "@sharedcomponents/LastRow";
import React, { FC, useEffect, useState } from "react";
import { Filter, TableContent, TableHeader } from "../exports/components";
import { IInvoice } from "../exports/interfaces";
import { newInvoice } from "../exports/scripts";

const InvoiceTable: FC<{
    invoices: IInvoice[];
    clientType: string;
    table: string;
}> = ({ invoices, clientType, table }) => {
    const dispatch = useTypedDispatch();
    const [filtered, setFiltered] = useState<IInvoice[]>(invoices || []);

    const createInvoice = () => dispatch(addRow(newInvoice, table));
    const deleteInvoices = () => dispatch(deleteRows(table));

    useEffect(() => {
        setFiltered(invoices);
    }, [invoices]);

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: 1 }}>
                    <Filter invoices={invoices} setFiltered={setFiltered} />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHeader
                                clientType={clientType}
                                filtered={filtered}
                                table={table}
                            />
                            <TableContent
                                invoices={invoices}
                                filtered={filtered}
                                table={table}
                                clientType={clientType}
                            />
                        </Table>
                        <LastRow
                            createItem={createInvoice}
                            deleteItem={deleteInvoices}
                        />
                    </TableContainer>
                </Box>
            </Stack>
        </>
    );
};

export default InvoiceTable;
