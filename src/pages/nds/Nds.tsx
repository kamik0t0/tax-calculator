import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTypedSelector } from "../../redux/hooks/hooks";
import TabPanel from "../../shared/TabPanel";
import Invoices from "./components/InvoiceTable/Invoices";
import Tabs from "./components/InvoiceTable/Tabs";
import TotalSummary from "./components/InvoiceTable/TotalSummary";
import { ClyentTypes, Tables, TabsTables } from "./utils/enums";
import {
    updateInvoices,
    calcSummary,
    setLocalStorage,
} from "../../redux/reducers/invoices/invoice-reducer";

const Nds: FC = () => {
    const { summary, sales, purches, recieved, issued } = useTypedSelector(
        (state) => state.invoiceSlice
    );
    const watchedSales = useLocalStorage(
        Tables.Sale,
        sales,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );
    const watchedPurches = useLocalStorage(
        Tables.Purchase,
        purches,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );
    const watchedRecieved = useLocalStorage(
        Tables.Received,
        recieved,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );
    const watchedIssued = useLocalStorage(
        Tables.Issued,
        issued,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );

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
                    textInfo1={Tables.Sale}
                    textInfo2={TabsTables.Sale}
                    invoices={watchedSales}
                    clientType={ClyentTypes.Buyer}
                    summ={summary.sales.summ}
                    nds={summary.sales.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Invoices
                    textInfo1={Tables.Purchase}
                    textInfo2={TabsTables.Purchase}
                    invoices={watchedPurches}
                    clientType={ClyentTypes.Seller}
                    summ={summary.purches.summ}
                    nds={summary.purches.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Invoices
                    textInfo1={Tables.Received}
                    textInfo2={TabsTables.Received}
                    invoices={watchedRecieved}
                    clientType={ClyentTypes.Buyer}
                    summ={summary.recieved.summ}
                    nds={summary.recieved.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Invoices
                    textInfo1={Tables.Issued}
                    textInfo2={TabsTables.Issued}
                    invoices={watchedIssued}
                    clientType={ClyentTypes.Seller}
                    summ={summary.issued.summ}
                    nds={summary.issued.nds}
                />
            </TabPanel>
        </>
    );
};

export default Nds;
