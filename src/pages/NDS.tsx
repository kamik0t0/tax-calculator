import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import React, { FC, useEffect, useState } from "react";
import { IInvoice } from "../interfaces/IInvoice";
import { ISummary } from "../interfaces/ISummary";
import Summary from "../components/Table/Summary";
import BasicTable from "../components/Table/Table";

const NDS: FC = () => {
    const [sales, setSales] = useState<IInvoice[]>([]);
    const [purches, setPurches] = useState<IInvoice[]>([]);
    const [summary, setSummary] = useState<ISummary>({
        purches: {
            summ: 0,
            nds: 0,
        },
        sales: {
            summ: 0,
            nds: 0,
        },
        nds: 0,
    });
    const save = () => {
        localStorage.setItem("sales", JSON.stringify(sales));
        localStorage.setItem("purches", JSON.stringify(purches));
    };

    const load = () => {
        const salesFromStorage = localStorage.getItem("sales");
        const purchesFromStorage = localStorage.getItem("purches");
        if (salesFromStorage !== null) setSales(JSON.parse(salesFromStorage));
        if (purchesFromStorage !== null)
            setPurches(JSON.parse(purchesFromStorage));
    };

    useEffect(() => {
        const SalesTotal = sales.reduce(
            (sale, current) => sale + +current.summ,
            0
        );
        const SalesNDS = sales.reduce(
            (sale, current) => sale + +current.nds,
            0
        );
        const PurchesNDS = purches.reduce(
            (purchase, current) => purchase + +current.nds,
            0
        );
        setSummary((prev) => {
            prev.sales.summ = SalesTotal;
            prev.sales.nds = SalesNDS;

            prev.nds = SalesNDS - PurchesNDS;
            if (prev.nds < 0) prev.nds = 0;
            return { ...prev };
        });
    }, [sales]);

    useEffect(() => {
        const PurchesTotal = purches.reduce(
            (purchase, current) => purchase + +current.summ,
            0
        );
        const PurchesNDS = purches.reduce(
            (purchase, current) => purchase + +current.nds,
            0
        );
        const SalesNDS = sales.reduce(
            (sale, current) => sale + +current.nds,
            0
        );
        setSummary((prev) => {
            prev.purches.summ = PurchesTotal;
            prev.purches.nds = PurchesNDS;
            prev.nds = SalesNDS - PurchesNDS;
            return { ...prev };
        });
    }, [purches]);

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Box
                sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}
            >
                <Button onClick={save} sx={{ height: 30 }} variant="contained">
                    Сохранить
                </Button>
                <Summary text="НДС к уплате: " width={300} textVariant="h6">
                    {summary.nds}
                </Summary>
                <Button onClick={load} sx={{ height: 30 }} variant="contained">
                    Загрузить
                </Button>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Container>
                    <Stack
                        sx={{ width: 1, justifyContent: "center" }}
                        direction="row"
                    >
                        <Summary
                            text="Итого покупок:"
                            width={280}
                            textVariant="body1"
                        >
                            {summary.purches.summ}
                        </Summary>
                        <Summary
                            text="НДС с покупок:"
                            width={260}
                            textVariant="body1"
                        >
                            {summary.purches.nds}
                        </Summary>
                    </Stack>
                </Container>
                <Container>
                    <Stack
                        sx={{ width: 1, justifyContent: "center" }}
                        direction="row"
                    >
                        <Summary
                            text="Итого продаж:"
                            width={280}
                            textVariant="body1"
                        >
                            {summary.sales.summ}
                        </Summary>
                        <Summary
                            text="НДС с продаж:"
                            width={260}
                            textVariant="body1"
                        >
                            {summary.sales.nds}
                        </Summary>
                    </Stack>
                </Container>
            </Box>
            <Divider sx={{ marginY: 2, color: "#2477CC" }} />
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: 1 }}>
                    <BasicTable
                        invoices={purches}
                        action={setPurches}
                        clientType="Продавец"
                    ></BasicTable>
                </Box>

                <Box sx={{ width: 1 }}>
                    <BasicTable
                        invoices={sales}
                        action={setSales}
                        clientType="Покупатель"
                    ></BasicTable>
                </Box>
            </Stack>
        </Container>
    );
};

export default NDS;
