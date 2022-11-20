import { setDebtorType } from "@finestore/fines-reducer";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { FinesUserInputBox } from "../exports/components";

const FinesUserDataType: React.FC = () => {
    const dispatch = useTypedDispatch();
    const handleDebtorType = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDebtorType((event.target as HTMLInputElement).value));
    };
    const { debtorType } = useTypedSelector((state) => state.fineSlice);
    return (
        <FinesUserInputBox>
            <Typography variant="h6">Должник</Typography>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={debtorType}
                    onChange={handleDebtorType}
                >
                    <FormControlLabel
                        value="org"
                        control={<Radio />}
                        label="Юридическое лицо"
                    />
                    <FormControlLabel
                        value="ie"
                        control={<Radio />}
                        label="ИП или физическое лицо"
                    />
                </RadioGroup>
            </FormControl>
        </FinesUserInputBox>
    );
};

export default FinesUserDataType;
