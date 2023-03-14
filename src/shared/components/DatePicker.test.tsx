import { defaultDateToLocalRU, makeDefaultDate } from "@helpers/dateHelpers";
import DatePicker from "@sharedcomponents/DatePicker";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
// Форматирование даты

describe("Date picker tests", () => {
    test("Date picker", () => {
        render(
            <DatePicker
                value={"2022-11-28"}
                error={false}
                onChange={() => {}}
                onKeyDown={() => {}}
            />
        );
        const stringDate = screen.getByDisplayValue("28.11.2022");
        const calendar = screen.getByRole("button");
        expect(stringDate).toBeInTheDocument();
        expect(calendar).toBeInTheDocument();
    });
    test("Date picker click", () => {
        render(
            <DatePicker
                value={"2022-11-28"}
                error={false}
                onChange={() => {}}
                onKeyDown={() => {}}
            />
        );
        const calendarButton = screen.getByRole("button");
        fireEvent.click(calendarButton);
        const calendar = screen.getByRole("dialog");
        expect(calendar).toBeInTheDocument();
        const seven = screen.getByText("7");
        fireEvent.click(seven);

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;

        const stamp = new Date(
            `${year}-${month}-${seven.innerHTML.slice(0, 1)}`
        ).getTime();
        const date = makeDefaultDate(stamp);

        render(
            <DatePicker
                value={`${year}-${month}-0${seven.innerHTML.slice(0, 1)}`}
                error={false}
                onChange={() => {}}
                onKeyDown={() => {}}
            />
        );
        const stringDate = defaultDateToLocalRU(date);

        const withNewDate = screen.getByDisplayValue(stringDate);
        expect(withNewDate).toBeInTheDocument();
    });
});
