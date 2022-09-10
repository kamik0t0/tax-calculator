import { Container, Divider } from "@mui/material";
import React, { FC } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import InvoiceTable from "./Table";
import TableSummary from "./TableSummary";

const Invoices: FC<{
    textInfo1: string;
    textInfo2: string;
    invoices: IInvoice[];
    clientType: string;
    summ: number;
    nds: number;
}> = ({ textInfo1, textInfo2, invoices, clientType, summ, nds }) => {
    return (
        <Container maxWidth="xl">
            <TableSummary textInfo={textInfo2} summ={summ} nds={nds} />
            <Divider sx={{ marginY: 2, color: "#2477CC" }} />.
            <InvoiceTable
                invoices={invoices}
                clientType={clientType}
                table={textInfo1}
            ></InvoiceTable>
        </Container>
    );
};

export default Invoices;
