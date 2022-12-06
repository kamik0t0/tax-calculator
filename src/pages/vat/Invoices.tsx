import { Box } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import TabPanel from "@sharedcomponents/TabPanel";
import React, { FC, useState } from "react";
import { useInvoiceStorageSelector } from "../../App";
import { Invoices, Tabs, TotalSummary } from "./exports/components";
import {
    ClyentTypes,
    Invoices as InvoicesTables,
    InvoicesTabs,
} from "./exports/utils";

const InvoiceTable: FC = () => {
    const { summary } = useTypedSelector((state) => state.invoiceSlice);
    const { sales, purches, recieved, issued } = useInvoiceStorageSelector();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} handleChange={handleChange} />
                <TotalSummary nds={summary.nds} />
            </Box>
            <TabPanel value={value} index={0}>
                <Invoices
                    textInfo1={InvoicesTables.Sale}
                    textInfo2={InvoicesTabs.Sale}
                    invoices={sales}
                    clientType={ClyentTypes.Buyer}
                    summ={summary.sales.summ}
                    nds={summary.sales.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Invoices
                    textInfo1={InvoicesTables.Purchase}
                    textInfo2={InvoicesTabs.Purchase}
                    invoices={purches}
                    clientType={ClyentTypes.Seller}
                    summ={summary.purches.summ}
                    nds={summary.purches.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Invoices
                    textInfo1={InvoicesTables.Received}
                    textInfo2={InvoicesTabs.Received}
                    invoices={recieved}
                    clientType={ClyentTypes.Buyer}
                    summ={summary.recieved.summ}
                    nds={summary.recieved.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Invoices
                    textInfo1={InvoicesTables.Issued}
                    textInfo2={InvoicesTabs.Issued}
                    invoices={issued}
                    clientType={ClyentTypes.Seller}
                    summ={summary.issued.summ}
                    nds={summary.issued.nds}
                />
            </TabPanel>
        </>
    );
};

export default InvoiceTable;
