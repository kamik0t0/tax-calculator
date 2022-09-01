import { Box, Button } from "@mui/material";
import React, { FC } from "react";
import { useTypedSelector, useTypedDispatch } from "../../redux/hooks/hooks";
import {
    setSales,
    setPurches,
    setAdvPayRecieved,
    setAdvPayIssued,
} from "../../redux/reducers/invoice-reducer";
import Summary from "./Summary";

const PageHeader: FC = () => {
    const dispatch = useTypedDispatch();
    const { summary, sales, purches, advPayRecieved, advPayIssued } =
        useTypedSelector((state) => state.invoiceSlice);

    const save = () => {
        localStorage.setItem("sales", JSON.stringify(sales));
        localStorage.setItem("purches", JSON.stringify(purches));
        localStorage.setItem("advPayRecieved", JSON.stringify(advPayRecieved));
        localStorage.setItem("advPayIssued", JSON.stringify(advPayIssued));
    };

    const load = () => {
        const salesFromStorage = localStorage.getItem("sales");
        const purchesFromStorage = localStorage.getItem("purches");
        const advPayRecievedFromStorage =
            localStorage.getItem("advPayRecieved");
        const advPayIssuedFromStorage = localStorage.getItem("advPayIssued");
        if (salesFromStorage !== null)
            dispatch(setSales(JSON.parse(salesFromStorage)));
        if (purchesFromStorage !== null)
            dispatch(setPurches(JSON.parse(purchesFromStorage)));
        if (advPayRecievedFromStorage !== null)
            dispatch(setAdvPayRecieved(JSON.parse(advPayRecievedFromStorage)));
        if (advPayIssuedFromStorage !== null)
            dispatch(setAdvPayIssued(JSON.parse(advPayIssuedFromStorage)));
    };
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                mb: 3,
                mt: 3,
            }}
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
    );
};

export default PageHeader;
