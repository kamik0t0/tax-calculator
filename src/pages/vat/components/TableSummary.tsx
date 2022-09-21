import { Box, Container, Stack } from "@mui/material";
import React, { FC } from "react";
import Summary from "@sharedcomponents/Summary";

const TableSummary: FC<{
    textInfo: string;
    summ: number;
    nds: number;
}> = ({ textInfo, summ, nds }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <Container>
                <Stack
                    sx={{ width: 1, justifyContent: "center" }}
                    direction="row"
                >
                    <Summary text={textInfo} width={280} textVariant="body1">
                        {summ}
                    </Summary>
                    <Summary text="НДС" width={260} textVariant="body1">
                        {nds}
                    </Summary>
                </Stack>
            </Container>
        </Box>
    );
};

export default TableSummary;
