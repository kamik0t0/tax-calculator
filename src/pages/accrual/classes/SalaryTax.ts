import { ISalaries, ISalary } from "../exports/interfaces";
import { getMinimalSalary, setIsCivilContract } from "../exports/scripts";
import { Limits, months } from "../exports/utils";
import { IMonths } from "../types/salary";

export class SalaryTax {
    protected readonly isCivilContract: boolean;
    protected readonly state: ISalaries;
    protected readonly salary: number;
    protected readonly month: string;
    protected readonly index: number;
    protected readonly monthIndex: number;
    protected readonly employeeId: string;
    protected readonly socialLimit: number;
    protected readonly retireLimit: number;
    protected readonly _minimalSalary: number;

    constructor(
        state: ISalaries,
        salary: number,
        month: string,
        index: number
    ) {
        this.state = state;
        this.salary = salary;
        this.month = month;
        this.index = index;
        this.socialLimit = Limits.social;
        this.retireLimit = Limits.retirement;
        this.monthIndex = months.findIndex((month) => month === this.month);
        this.employeeId = state.months[month].salary[index].employeeId;
        this._minimalSalary = getMinimalSalary(month);
        this.isCivilContract = setIsCivilContract(
            this.state.employees,
            this.employeeId
        );
    }

    public get totalSalary() {
        const { prevMonthsTotalSalary, currMonthsTotalSalary } =
            this.calcMonthsCumulativeSalary(this.state.months);
        return {
            prevMonth: prevMonthsTotalSalary,
            currentMonth: currMonthsTotalSalary,
        };
    }
    // Сумма начислений нарастающим итогом по сотруднику
    protected calcMonthsCumulativeSalary(months: IMonths) {
        const prevMonthCumulative: ISalary[] = [];
        let monthCounter = 0;
        for (const month in months) {
            // 2) по id сотрудника выбрать начисления в предшествующих месяцах...
            if (this.employeeId) {
                const employeeAccrual: ISalary = months[month].salary.find(
                    (accrual: ISalary) => accrual.employeeId === this.employeeId
                );
                if (monthCounter === this.monthIndex) break;
                // ... если не undefined
                employeeAccrual && prevMonthCumulative.push(employeeAccrual);
            }
            monthCounter++;
        }
        // Сумма начислений за предыдущие месяцы
        const prevMonthsTotalSalary = prevMonthCumulative.reduce(
            (accrualSumm, current) => accrualSumm + current.accrued,
            0
        );
        // Сумма начислений по текущий месяц
        const currMonthsTotalSalary = prevMonthsTotalSalary + this.salary;
        return { prevMonthsTotalSalary, currMonthsTotalSalary };
    }
    // расчет взносов с учетом лимита начисления по тарифам, где ставка применяется ко всей сумме начислений (FixBase)
    protected calcInsuranceFixBase(limit: number, rate: number) {
        let exceedInsurancelLimit = 0;
        let insurance = 0;
        let insuranceBase = 0;

        if (this.totalSalary.prevMonth < limit) {
            if (this.totalSalary.currentMonth > limit) {
                exceedInsurancelLimit = this.totalSalary.currentMonth - limit;
                insuranceBase = this.salary - exceedInsurancelLimit;
                insurance = insuranceBase * rate;
            } else {
                insurance = this.salary * rate;
                insuranceBase = this.salary;
            }
        } else {
            insuranceBase = this.salary;
        }
        return {
            exceedInsurancelLimit,
            insurance,
            insuranceBase,
        };
    }

    // расчет взносов с учетом лимита начисления по тарифам, где применяются разные ставки (FloatBase)
    protected calcInsuranceFloatBase(
        limit: number,
        basicRate: number,
        businessRate: number
    ) {
        let exceedInsurancelLimit = 0;
        let insurance = 0;
        let insuranceBase = 0;
        let minimalInsurance = 0;

        if (this.totalSalary.prevMonth < limit) {
            // Если лимит с учетом начислений текущего месяца (prevMonthsTotalSalary) превышен, то
            if (this.totalSalary.currentMonth > limit) {
                exceedInsurancelLimit = this.totalSalary.currentMonth - limit;
                // TODO: добавить разбивку по ставкам
                insuranceBase = this.salary - exceedInsurancelLimit;
                // Остаток до превышения выше мрот:
                // МРОТ * BasicRate, Остальное * BusinessRate,
                if (exceedInsurancelLimit > this._minimalSalary) {
                    minimalInsurance = this._minimalSalary * basicRate;
                    insurance =
                        (exceedInsurancelLimit - this._minimalSalary) *
                        businessRate;
                    // Остаток до превышения ниже мрот:
                } else {
                    insurance = this._minimalSalary * basicRate;
                    insuranceBase = this.salary;
                }
                // Если лимит с учетом начислений текущего месяца НЕ превышен, то:
            } else {
                minimalInsurance = this._minimalSalary * basicRate;
                insurance = (this.salary - this._minimalSalary) * businessRate;
                insuranceBase = this.salary;
            }
        } else {
            exceedInsurancelLimit = this.salary;
        }

        return {
            exceedInsurancelLimit,
            insurance,
            insuranceBase,
            minimalInsurance,
        };
    }
    // расчет взносов без учета лимита начисления (Limitless) по тарифам, где применяются разные ставки (FloatBase)
    protected calcInsuranceFloatBaseLimitless(
        basicRate: number,
        businessRate: number
    ): number {
        let insurance = 0;
        let minimalInsurance = 0;

        if (this.salary <= this._minimalSalary) {
            return this.salary * basicRate;
        } else {
            minimalInsurance = this._minimalSalary * basicRate;
            insurance = (this.salary - this._minimalSalary) * businessRate;
            return insurance + minimalInsurance;
        }
    }
}
