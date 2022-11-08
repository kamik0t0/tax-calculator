import { useFontHeaders } from "@customhooks/useFontHeader";
import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";

const CommonHeader: React.FC = (props) => {
    const [headersTextColor] = useFontHeaders();
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            width={600}
                            sx={headersTextColor}
                            align="left"
                        >
                            Показатель
                        </TableCell>
                        <TableCell
                            width={300}
                            sx={headersTextColor}
                            align="center"
                        >
                            Формула
                        </TableCell>
                        <TableCell
                            width={250}
                            sx={headersTextColor}
                            align="right"
                        >
                            Сумма
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
};

export default CommonHeader;
