import { defaultDateToLocalRU, makeDefaultDate } from "@helpers/dateHelpers";
import { Table, TableBody, TableRow } from "@mui/material";
import DateCell from "@sharedcomponents/DateCell";
// Для работы методов тетсирования связанных с DOM типа toBeInTheDocument()
// Установка npm i @testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

describe("Date cell tests", () => {
    test("Date cell", () => {
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <DateCell index={0} getDate={() => {}}>
                            {1669658925633}
                        </DateCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        const date = makeDefaultDate(1669658925633);
        const stringDate = screen.getByText(defaultDateToLocalRU(date));
        expect(stringDate).toBeInTheDocument();
    });
    test("Date cell toggled to date input", () => {
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <DateCell index={0} getDate={() => {}}>
                            {1669658925633}
                        </DateCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        const dateCell = screen.getByTestId("DateCell");
        const date = makeDefaultDate(1669658925633);
        const stringDate = screen.getByText(defaultDateToLocalRU(date));
        expect(stringDate).toBeInTheDocument();

        fireEvent.click(dateCell);
        const dateField = screen.getByRole("textbox");
        expect(dateField).toBeInTheDocument();
    });
});
