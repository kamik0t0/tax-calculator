import { Box, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTypedSelector } from "../../redux/hooks/hooks";
import Invoices from "./components/InvoiceTable/Invoices";
import Summary from "./components/InvoiceTable/Summary";
import TabPanel from "./components/InvoiceTable/TabPanel";
import { a11yProps } from "./utils/a11yProps";
import { ClyentTypes, Tables, TabsTables } from "./utils/enums";

const Nds: FC = () => {
    const { summary } = useTypedSelector((state) => state.invoiceSlice);
    const sales = useLocalStorage(Tables.Sale);
    const purches = useLocalStorage(Tables.Purchase);
    const recieved = useLocalStorage(Tables.Received);
    const issued = useLocalStorage(Tables.Issued);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered={true}
                    sx={{ height: 50 }}
                >
                    <Tab label={TabsTables.Sale} {...a11yProps(0)} />
                    <Tab label={TabsTables.Purchase} {...a11yProps(1)} />
                    <Tab label={TabsTables.Received} {...a11yProps(2)} />
                    <Tab label={TabsTables.Issued} {...a11yProps(3)} />
                </Tabs>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        mb: 3,
                        mt: 3,
                    }}
                >
                    <Summary text="НДС к уплате: " width={300} textVariant="h6">
                        {summary.nds}
                    </Summary>
                </Box>
            </Box>
            <TabPanel value={value} index={0}>
                <Invoices
                    textInfo1={Tables.Sale}
                    textInfo2={TabsTables.Sale}
                    invoices={sales}
                    clientType={ClyentTypes.Buyer}
                    summ={summary.sales.summ}
                    nds={summary.sales.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Invoices
                    textInfo1={Tables.Purchase}
                    textInfo2={TabsTables.Purchase}
                    invoices={purches}
                    clientType={ClyentTypes.Seller}
                    summ={summary.purches.summ}
                    nds={summary.purches.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Invoices
                    textInfo1={Tables.Received}
                    textInfo2={TabsTables.Received}
                    invoices={recieved}
                    clientType={ClyentTypes.Buyer}
                    summ={summary.recieved.summ}
                    nds={summary.recieved.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Invoices
                    textInfo1={Tables.Issued}
                    textInfo2={TabsTables.Issued}
                    invoices={issued}
                    clientType={ClyentTypes.Seller}
                    summ={summary.issued.summ}
                    nds={summary.issued.nds}
                />
            </TabPanel>
        </>
    );
};

export default Nds;
