import type { IRates, IFinesData } from "../exports/types";
import { FinesCalc } from "./finesCalc";

export class FinesCalcIE extends FinesCalc {
    constructor(debt: number, dueDay: number, payDay: number) {
        super(debt, dueDay, payDay);
    }

    public finesArr(): IFinesData[] {
        const filteredRates = this._rates.filter((rate: IRates, i: number) => {
            const isNext = !!this._rates[i + 1];
            const nextDay = isNext && this._rates[i + 1];
            if (this._dueDay >= rate.date && this._dueDay < nextDay.date)
                return rate.date;
            return rate.date >= this._dueDay && rate.date <= this._payDay;
        });

        return this._crateFinesArr(
            filteredRates,
            this._fineRate,
            this._dueDay,
            this._payDay
        );
    }
}
