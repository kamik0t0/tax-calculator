import {
    setFinesDebt,
    setFinesDueDate,
    setFinesPayDate,
} from "@finestore/fines-reducer";
import { makeDefaultDate } from "@helpers/dateHelpers";
import { Typography } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { Dayjs } from "dayjs";
import React from "react";
import {
    DatePicker,
    NumberField,
    FinesUserInputBox,
} from "../exports/components";

const FinesUserDataInputs: React.FC = () => {
    const dispatch = useTypedDispatch();
    const { debt, dueDate, payDate, isError } = useTypedSelector(
        (state) => state.fineSlice
    );

    const getDebt = (value: number) => dispatch(setFinesDebt(value));
    const handleDueDate = (date: Dayjs | null) => {
        const parsedDate = date && Date.parse(date.format());
        if (parsedDate) {
            dispatch(setFinesDueDate(parsedDate));
        }
    };
    const handlePayDay = (date: Dayjs | null) => {
        const parsedDate = date && Date.parse(date.format());
        if (parsedDate) {
            dispatch(setFinesPayDate(parsedDate));
        }
    };

    // Форматирование даты
    const formattedDueDateValue = dueDate === 0 ? "" : makeDefaultDate(dueDate);
    const formattedPayDateValue = payDate === 0 ? "" : makeDefaultDate(payDate);
    return (
        <>
            <FinesUserInputBox>
                <Typography>Сумма задолженности</Typography>
                <NumberField
                    label="Задолженность"
                    value={debt}
                    getNumberValue={getDebt}
                />
            </FinesUserInputBox>
            <FinesUserInputBox>
                <Typography>Установленный срок оплаты</Typography>
                <DatePicker
                    value={formattedDueDateValue}
                    onChange={handleDueDate}
                    error={isError}
                />
            </FinesUserInputBox>
            <FinesUserInputBox>
                <Typography>Дата фактической оплаты</Typography>
                <DatePicker
                    value={formattedPayDateValue}
                    onChange={handlePayDay}
                    error={isError}
                />
            </FinesUserInputBox>
        </>
    );
};

export default FinesUserDataInputs;
