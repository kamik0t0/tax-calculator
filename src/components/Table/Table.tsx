import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, {
    Dispatch,
    FC,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { useSort } from "../../hooks/useSort";
import { IInvoice } from "../../interfaces/IInvoice";
import { createData } from "../../scripts/createDate";
import Cell from "./Cell";
import Checkbox from "../CheckBox";
import RemoveRow from "../RemoveRow";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, Button } from "@mui/material";
import Filter from "../Filter";

const makePointer = () => ({
    "&:hover": { cursor: "pointer" },
});

const BasicTable: FC<{
    invoices: IInvoice[];
    action: Dispatch<SetStateAction<IInvoice[]>>;
    clientType: string;
}> = ({ invoices, action, clientType }) => {
    const [filtered, setFiltered] = useState<IInvoice[]>(invoices || []);
    const [sort, sortOrder] = useSort(action, filtered);

    const typedSort = sort as unknown as
        | MouseEventHandler<HTMLTableCellElement>
        | undefined;

    const addRow = () => {
        const newPosition = createData("Дата", "Контрагент", 0, 0, false);
        action((prev: IInvoice[]) => [...prev, newPosition]);
    };
    const deleteRows = () => {
        action((invoices: IInvoice[]) =>
            invoices.filter((invoice) => !invoice.checked)
        );
    };
    const deleteRow = (index: number) => {
        action((invoices: IInvoice[]) =>
            invoices.filter((invoice, i) => i !== index)
        );
    };

    useEffect(() => {
        setFiltered(invoices);
    }, [invoices]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    mb: 1,
                }}
            >
                <Filter invoices={invoices} setFiltered={setFiltered} />
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Box>
                                    {sortOrder ? (
                                        <ArrowDownwardSharpIcon
                                            sx={{ height: 15 }}
                                        />
                                    ) : (
                                        <ArrowUpwardIcon sx={{ height: 15 }} />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                Дата
                            </TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                {clientType}
                            </TableCell>
                            <TableCell align="center">в т.ч. НДС</TableCell>
                            <TableCell
                                sx={makePointer()}
                                onClick={typedSort}
                                align="center"
                            >
                                Сумма
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((invoice: IInvoice, index: number) => (
                            <TableRow key={index}>
                                <Checkbox
                                    index={index}
                                    action={action}
                                    isChecked={invoice.checked}
                                />
                                <Cell
                                    action={action}
                                    name="Дата"
                                    index={index}
                                    prop="date"
                                    type="date"
                                    disabled={false}
                                >
                                    {invoice.date}
                                </Cell>
                                <Cell
                                    action={action}
                                    name={clientType}
                                    index={index}
                                    prop="client"
                                    type=""
                                    disabled={false}
                                >
                                    {invoice.client}
                                </Cell>
                                <Cell
                                    action={action}
                                    name="в т.ч. НДС"
                                    index={index}
                                    prop="nds"
                                    type="number"
                                    disabled={true}
                                >
                                    {invoice.nds}
                                </Cell>
                                <Cell
                                    action={action}
                                    name="Сумма"
                                    index={index}
                                    prop="summ"
                                    type="number"
                                    disabled={false}
                                >
                                    {invoice.summ}
                                </Cell>
                                <RemoveRow action={deleteRow} index={index} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Container
                    sx={{
                        "& > :not(style)": { m: 1 },
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Fab
                        onClick={addRow}
                        color="secondary"
                        aria-label="add"
                        size="small"
                    >
                        <AddIcon />
                    </Fab>
                    <Button
                        onClick={deleteRows}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                    >
                        Удалить отмеченные
                    </Button>
                </Container>
            </TableContainer>
        </>
    );
};

export default BasicTable;
