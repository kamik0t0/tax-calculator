import { IMonths, ISalaries, ISalary } from "../exports/interfaces";
import { StaticRates } from "../exports/utils";
import { SalaryBasicTax } from "./SalaryBasicTax";
import { SalaryBusinessTax } from "./SalaryBusinessTax";
import { SalaryItTax } from "./SalaryItTax";

export class calcSalaryTaxes {
    private readonly _state: ISalaries;
    private readonly rate: string;

    constructor(state: ISalaries, rate: string) {
        this._state = state;
        this.rate = rate;
    }

    private getSalaryData(value: number, table: string, index: number) {
        const props = [this._state, value, table, index] as const;
        const map = new Map();
        map.set("01", new SalaryBasicTax(...props))
            .set("06", new SalaryItTax(...props))
            .set("20", new SalaryBusinessTax(...props));
        return map.get(this.rate);
    }

    private calcRecoupment(childrenQtty: number) {
        if (childrenQtty <= 2) return childrenQtty * 1400;
        else return (childrenQtty - 2) * 3000 + 2800;
    }

    public calcPIT(salary: number, children: number) {
        const recoupment = this.calcRecoupment(children);
        const PIT = (salary - recoupment) * StaticRates.PIT;
        const payment = salary - PIT;
        return { PIT, payment };
    }

    public recalcYearSalary(monthsFromState: IMonths) {
        const months: IMonths = Object.assign({}, monthsFromState);
        for (const table in months) {
            // массив зарплат в каждом месяце
            const totalMonthSalary: ISalary[] = months[table].salary;
            // итерация по сотрудникам в массиве зарплат в рамках одного месяца
            // пересчет взносов в месяце
            if (totalMonthSalary.length > 0) {
                totalMonthSalary.forEach((employee, index) => {
                    const salary = employee.accrued;
                    const children = employee.childrenQtty;

                    const taxes = this.getSalaryData(salary, table, index);

                    const { PIT, payment } = this.calcPIT(salary, children);
                    months[table].salary[index].tax = +PIT;
                    months[table].salary[index].pay = +payment;

                    const { retire, retireBase, exceedRetireLimit } =
                        taxes.calcRetireInsurance();
                    const { social, socialBase, exceedSocialLimit } =
                        taxes.calcSocialInsurance();
                    const accident = taxes.calcAccidentInsurance();
                    const medical = taxes.calcMedicalInsurance();

                    months[table].salary[index].insurance.accident = +accident;
                    months[table].salary[index].insurance.medical = +medical;

                    months[table].salary[index].insurance.retirement = +retire;
                    months[table].salary[index].overRetirmentLimit =
                        exceedRetireLimit;
                    months[table].salary[index].insuranceRetirementBase =
                        retireBase;

                    months[table].salary[index].insurance.social = +social;
                    months[table].salary[index].overSocialLimit =
                        exceedSocialLimit;
                    months[table].salary[index].insuranceSocialBase =
                        socialBase;

                    months[table].salary[index].cumulativeAccrual =
                        taxes.totalSalary.currentMonth;
                    months[table].salary[index].insuranceTotal =
                        social + retire + accident + medical;
                });
            }
        }
        return months;
    }
}
