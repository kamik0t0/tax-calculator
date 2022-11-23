import { makeDefaultDate } from "@helpers/dateHelpers";
import { Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import {
    DatePicker,
    NumberField,
    FinesUserInputBox,
} from "../exports/components";
import { useFinesInput } from "../hooks/useFinesInput";

const FinesUserDataInputs: React.FC = () => {
    const { debt, dueDate, payDate, isError } = useTypedSelector(
        (state) => state.fineSlice
    );
    const { getDebt, handleDueDate, handlePayDay } = useFinesInput();
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
