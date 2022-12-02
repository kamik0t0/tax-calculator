import { useDateFilter } from "@customhooks/useDateFilter";
import { stampToStr } from "@helpers/dateHelpers";
import { InputLabel } from "@mui/material";
import DatePicker from "@sharedcomponents/DatePicker";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { IInvoice } from "../exports/interfaces";

const FilterDate: React.FC<{
    invoices: IInvoice[];
    setFiltered: Dispatch<SetStateAction<IInvoice[]>>;
}> = ({ invoices, setFiltered }) => {
    const [isCorrect, startDateHandler, endDateHandler, dateStart, dateEnd] =
        useDateFilter(invoices, setFiltered);

    // конвертация timestamp в строку
    const startDateDisplay = useMemo(() => stampToStr(dateStart), [dateStart]);
    const endDateDisplay = useMemo(() => stampToStr(dateEnd), [dateEnd]);
    return (
        <>
            <InputLabel
                sx={{
                    ml: 2,
                    color: "#2477CC",
                }}
            >
                c:
            </InputLabel>
            <DatePicker
                value={startDateDisplay}
                onChange={startDateHandler}
                error={!isCorrect}
                width={100}
            />
            <InputLabel
                sx={{
                    ml: 2,
                    color: "#2477CC",
                }}
            >
                по:
            </InputLabel>
            <DatePicker
                value={endDateDisplay}
                onChange={endDateHandler}
                error={!isCorrect}
                width={100}
            />
        </>
    );
};

export default FilterDate;
