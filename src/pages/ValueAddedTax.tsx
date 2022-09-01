import { Box, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
import PageHeader from "../components/Table/PageHeader";
import Invoices from "../components/Table/Invoices";
import { useTypedSelector } from "../redux/hooks/hooks";
import {
    setPurches,
    setSales,
    setAdvPayIssued,
    setAdvPayRecieved,
} from "../redux/reducers/invoice-reducer";
import { a11yProps } from "../utils/a11yProps";
import TabPanel from "../components/TabPanel";

const ValueAddedTax: FC = () => {
    const { sales, purches, advPayRecieved, advPayIssued, summary } =
        useTypedSelector((state) => state.invoiceSlice);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                    <Tab label="Продажи" {...a11yProps(0)} />
                    <Tab label="Покупки" {...a11yProps(1)} />
                    <Tab label="Авансы полученные" {...a11yProps(2)} />
                    <Tab label="Авансы выданные" {...a11yProps(3)} />
                </Tabs>
                <PageHeader />
            </Box>
            <TabPanel value={value} index={0}>
                <Invoices
                    textInfo1="Продажи"
                    textInfo2="НДС"
                    invoices={sales}
                    action={setSales}
                    clientType="Покупатель"
                    summ={summary.sales.summ}
                    nds={summary.sales.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Invoices
                    textInfo1="Покупки"
                    textInfo2="НДС"
                    invoices={purches}
                    action={setPurches}
                    clientType="Продавец"
                    summ={summary.purches.summ}
                    nds={summary.purches.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Invoices
                    textInfo1="Авансы полученные"
                    textInfo2="НДС"
                    invoices={advPayRecieved}
                    action={setAdvPayRecieved}
                    clientType="Покупатель"
                    summ={summary.advPayRecieved.summ}
                    nds={summary.advPayRecieved.nds}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Invoices
                    textInfo1="Авансы выданные"
                    textInfo2="НДС"
                    invoices={advPayIssued}
                    action={setAdvPayIssued}
                    clientType="Продавец"
                    summ={summary.advPayIssued.summ}
                    nds={summary.advPayIssued.nds}
                />
            </TabPanel>
        </>
    );
};

export default ValueAddedTax;
