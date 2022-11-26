import { IFinesData } from "../exports/types";
import { FinesCalc } from "./finesCalc";

export class FinesCalcLLC extends FinesCalc {
    private readonly _fineRateLLC: number;
    private readonly _inroductionHighRate: number;
    private readonly _cencelHighRateDate: number;
    private readonly _shift: number;

    constructor(debt: number, dueDay: number, payDay: number) {
        super(debt, dueDay, payDay);
        this._fineRateLLC = 150;
        this._inroductionHighRate = Date.parse("2017-10-01");
        this._cencelHighRateDate = Date.parse("2022-03-09");
        this._shift = this._oneDay * 30;
    }

    // Дата окончания начисления пеней по обычной ставке
    private get _basicRateEnd(): number {
        return this._dueDay + this._shift;
    }

    // Дата с которой начисляются повышенные пени
    private get _higherRateStart(): number {
        return this._dueDay + this._shift;
    }

    // Дата окончания начисления повышенных пеней - наиболее ранняя из следующих:
    // дата погашение пеней          this._payDay
    // дата отмены повышенной ставки this._cencelHighRateDate
    private get _higherRateEnd(): number {
        return this._payDay > this._cencelHighRateDate
            ? this._cencelHighRateDate - this._oneDay
            : this._payDay;
    }

    // Проверка применяется ли повышенная ставка пеней
    private get _isHigherRate(): boolean {
        const dateDifference = this._getDif(this._payDay, this._dueDay);
        // Если дата возникновения задолженности ранее чем 29.09.2017 включительно то повышенные пени не начисляются
        if (this._dueDay + this._oneDay < this._inroductionHighRate)
            return false;

        // Если возникновение задолженности в рамках периода действия повышенной ставки но период начисления пеней <= 30 дней то повышенные пени не начисляются
        if (
            this._dueDay >= this._inroductionHighRate &&
            this._payDay < this._cencelHighRateDate &&
            dateDifference <= 30
        )
            return false;
        // Если дата возникновения задолженности >= 09.03.2022 то повышенная ставка не применяется
        if (this._dueDay >= this._cencelHighRateDate - this._oneDay)
            return false;
        // В остальных случаях повышенная ставка может применяется
        return true;
    }

    // Массив пеней по соответствующим ставкам для юр лиц
    public finesArr(): IFinesData[] {
        const filteredRates = this._filterRates(this._dueDay, this._payDay);
        if (this._isHigherRate) {
            // фильтр первых 30 дней применения основной ставки 1/300
            const filteredThirtyDays = this._filterRates(
                this._dueDay,
                this._basicRateEnd
            );
            // массив сумм пеней в первые 30 дней
            const firstThirtyDays = this._crateFinesArr(
                filteredThirtyDays,
                this._fineRate,
                this._dueDay,
                this._basicRateEnd
            );
            // фильтр периода в котором применились повышенные ставки
            const filteredHightRates = this._filterRates(
                this._higherRateStart,
                this._higherRateEnd
            );
            // массив сумм пеней по повышенным ставкам
            const highRates = this._crateFinesArr(
                filteredHightRates,
                this._fineRateLLC,
                this._higherRateStart,
                this._higherRateEnd
            );
            // если пени начислялись после введения льготы от 09.03.2022
            if (this._payDay > this._higherRateEnd) {
                // фильтр периода после введения льготы
                const filteredAfterHighRates = this._filterRates(
                    this._cencelHighRateDate,
                    this._payDay
                );
                // массив сумм пеней по льготной ставке
                const afterHighRates = this._crateFinesArr(
                    filteredAfterHighRates,
                    this._fineRate,
                    this._cencelHighRateDate - this._oneDay,
                    this._payDay
                );
                return firstThirtyDays.concat(highRates).concat(afterHighRates);
            }
            return firstThirtyDays.concat(highRates);
        }
        return this._crateFinesArr(
            filteredRates,
            this._fineRate,
            this._dueDay,
            this._payDay
        );
    }
}
