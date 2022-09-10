import { Box, Paper, Stack, Table, TableContainer } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import {
    addRow,
    deleteRows,
} from "../../../../redux/reducers/invoices/invoice-reducer";
import { newInvoice } from "../../../../scripts/createData";
import LastRow from "../../../../shared/LastRow";
import Filter from "./Filter/Filter";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

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
