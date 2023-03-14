import { IEmployee, IMonths, ISalary } from "../exports/interfaces";
import { rates, StaticRates } from "../exports/utils";
import { SalaryBasicTax } from "./SalaryBasicTax";
import { SalaryBusinessTax } from "./SalaryBusinessTax";
import { SalaryItTax } from "./SalaryItTax";

/** 
    Содержит свойства и методы по расчету страховых взносов с заработной платы и НДФЛ
*/

export class calcSalaryTaxes {
    private readonly _months: IMonths;
    private readonly rate: rates;
    private readonly employees: IEmployee[];

    constructor(months: IMonths, rate: rates, employees: IEmployee[]) {
        this._months = months;
        this.rate = rate;
        this.employees = employees;
    }
    /**
        Возвращает класс соответствующий коду тарифа. Класс имплементирует интерфейс ISalaryClass и, следовательно, реализует свою логику расчета на каждый описаный метод.
     */
    private getSalaryData(value: number, table: string, index: number) {
        const props = [
            this._months,
            value,
            table,
            index,
            this.employees,
        ] as const;

        const map = new Map<
            string,
            SalaryBasicTax | SalaryItTax | SalaryBusinessTax
        >();

        map.set(rates.basic, new SalaryBasicTax(...props))
            .set(rates.it, new SalaryItTax(...props))
            .set(rates.business, new SalaryBusinessTax(...props));
        return map.get(this.rate);
    }
    /**
        Считает детские вычеты
        TODO: абслютные значения в константы
     */
    static calcRecoupment(childrenQtty: number) {
        if (childrenQtty <= 2) return childrenQtty * 1400;
        else return (childrenQtty - 2) * 3000 + 2800;
    }
    /**
        Считает НДФЛ с учетом вычетов
      */
    static calcPIT(salary: number, children: number) {
        const recoupment = calcSalaryTaxes.calcRecoupment(children);
        const PIT = (salary - recoupment) * StaticRates.PIT;
        const payment = salary - PIT;
        return { PIT, payment };
    }
    /**
        Производит перерасчет зарплаты по году. Принимает аргументом стейт и внутри мутирует поля. Вероятно спорное решение 
    */
    public recalcYearSalary(months: IMonths) {
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

                    const { PIT, payment } = calcSalaryTaxes.calcPIT(
                        salary,
                        children
                    );
                    months[table].salary[index].tax = +PIT;
                    months[table].salary[index].pay = +payment;

                    const { retire, retireBase, exceedRetireLimit } =
                        taxes!.calcRetireInsurance();
                    const { social, socialBase, exceedSocialLimit } =
                        taxes!.calcSocialInsurance();
                    const accident = taxes!.calcAccidentInsurance();
                    const medical = taxes!.calcMedicalInsurance();

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
                        taxes!.totalSalary.currentMonth;
                    months[table].salary[index].insuranceTotal =
                        social + retire + accident + medical;
                });
            }
        }
    }
}
