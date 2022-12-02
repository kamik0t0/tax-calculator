import type { IRates, IFinesData } from "../exports/types";
import { Rates } from "../exports/utils";

export class FinesCalc {
    public readonly debt: number;
    protected readonly _dueDay: number;
    protected readonly _payDay: number;
    protected readonly _rates: IRates[];
    protected readonly _oneDay: number;
    protected readonly _fineRate: number;

    constructor(debt: number, dueDay: number, payDay: number) {
        this.debt = debt;
        this._dueDay = dueDay - new Date(dueDay).getTimezoneOffset() * 60000;
        this._payDay = payDay - new Date(payDay).getTimezoneOffset() * 60000;
        this._rates = Rates;
        this._oneDay = 86400000;
        this._fineRate = 300;
    }
    // Расчет пеней
    public calcFines(arr: IFinesData[]): number {
        return +arr.reduce((summ, cumm) => summ + cumm.fines, 0).toFixed(2);
    }
    // Количество дней просрочки
    public calcDays(arr: IFinesData[]): number {
        return +arr.reduce((summ, cumm) => summ + cumm.days, 0).toFixed();
    }
    // Рассчет пени
    protected _getFine = (dif: number, _fineRate: number, rate: number) =>
        +((this.debt * dif * rate) / _fineRate).toFixed(2);
    // Разница между датами в днях
    protected _getDif = (later: number, earlier: number) =>
        (later - earlier) / this._oneDay;

    // Фильтрация массива со ставками рефинансирования по интервалу дат
    protected _filterRates(start: number, end: number): IRates[] {
        const filteredRates = this._rates.filter((rate: IRates, i: number) => {
            const isNext = !!this._rates[i + 1];
            const nextDay = isNext && this._rates[i + 1];
            if (start >= rate.date && start < nextDay.date) return rate.date;
            return rate.date >= start && rate.date <= end;
        });
        return filteredRates;
    }
    // Массив пеней по соответствующим ставкам
    protected _crateFinesArr(
        rates: IRates[],
        _fineRate: number,
        start: number,
        end: number
    ): IFinesData[] {
        const finesData: IFinesData[] = [];

        const debt = this.debt;
        if (rates.length === 0) {
            const rate = this._rates[this._rates.length - 1].rate;
            const days = this._getDif(end, start);
            const fines = this._getFine(days, _fineRate, rate);
            finesData.push({ debt, fines, days, rate, _fineRate });
            return finesData;
        }

        rates.forEach((rateData, i) => {
            const { rate, date } = rateData;
            const isNext = !!rates[i + 1];
            const nextDay = isNext && rates[i + 1].date;
            const startDay = date;

            const addFine = (
                debt: number,
                fines: number,
                days: number,
                rate: number
            ) => finesData.push({ debt, fines, days, rate, _fineRate });
            if (rates.length === 1) {
                const days = this._getDif(end, start);
                const fines = this._getFine(days, _fineRate, rate);
                addFine(debt, fines, days, rate);
            } else if (isNext && i === 0) {
                const days = this._getDif(nextDay - this._oneDay, start);
                const fines = this._getFine(days, _fineRate, rate);
                addFine(debt, fines, days, rate);
            } else {
                if (isNext && end >= nextDay) {
                    const days = this._getDif(nextDay, startDay);
                    const fines = this._getFine(days, _fineRate, rate);
                    addFine(debt, fines, days, rate);
                } else {
                    const days = this._getDif(end + this._oneDay, startDay);
                    const fines = this._getFine(days, _fineRate, rate);
                    addFine(debt, fines, days, rate);
                }
            }
        });
        return finesData;
    }
}
