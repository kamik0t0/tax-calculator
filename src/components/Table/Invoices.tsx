import { Box, Container, Divider, Stack } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import Summary from "./Summary";
import BasicTable from "./BasicTable";

const Invoices: FC<{
    textInfo1: string;
    textInfo2: string;
    invoices: IInvoice[];
    action: ActionCreatorWithPayload<IInvoice[]>;
    clientType: string;
    summ: number;
    nds: number;
}> = ({ textInfo1, textInfo2, invoices, action, clientType, summ, nds }) => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex" }}>
                <Container>
                    <Stack
                        sx={{ width: 1, justifyContent: "center" }}
                        direction="row"
                    >
                        <Summary
                            text={textInfo1}
                            width={280}
                            textVariant="body1"
                        >
                            {summ}
                        </Summary>
                        <Summary
                            text={textInfo2}
                            width={260}
                            textVariant="body1"
                        >
                            {nds}
                        </Summary>
                    </Stack>
                </Container>
            </Box>
            <Divider sx={{ marginY: 2, color: "#2477CC" }} />
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: 1 }}>
                    <BasicTable
                        invoices={invoices}
                        action={action}
                        clientType={clientType}
                    ></BasicTable>
                </Box>
            </Stack>
        </Container>
    );
};

export default Invoices;
