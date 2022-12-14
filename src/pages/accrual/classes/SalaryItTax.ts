import { SalaryTax } from "../exports/classes";
import { IEmployee, IMonths, ISalaryClass } from "../exports/interfaces";
import { itRates, StaticRates } from "../utils/salaryConsts";
/** 
    Содержит свойства и реализует методы расчета страховых взносов по коду тарифа 06 - IT компании
  */
export class SalaryItTax extends SalaryTax implements ISalaryClass {
    private readonly _retireRate: number;
    private readonly _socialRate: number;
    private readonly _accidentRate: number;
    private readonly _medicalRate: number;

    constructor(
        months: IMonths,
        salary: number,
        month: string,
        index: number,
        employees: IEmployee[]
    ) {
        super(months, salary, month, index, employees);
        this._retireRate = itRates.retirement;
        this._socialRate = itRates.social;
        this._accidentRate = StaticRates.accident;
        this._medicalRate = itRates.medical;
    }
    // расчет взносов IT-компаний на НС и ПЗ страхование
    public calcAccidentInsurance(): number {
        console.log(this.isCivilContract);

        return this.isCivilContract ? 0 : this.salary * this._accidentRate;
    }
    // расчет взносов IT-компаний на медицинское страхование
    public calcMedicalInsurance(): number {
        return this.salary * this._medicalRate;
    }
    // расчет взносов IT-компаний на пенсионное страхование
    public calcRetireInsurance() {
        const { exceedInsurancelLimit, insurance, insuranceBase } =
            this.calcInsuranceFixBase(this.retireLimit, this._retireRate);
        return {
            exceedRetireLimit: exceedInsurancelLimit,
            retire: insurance,
            retireBase: insuranceBase,
        };
    }
    // расчет взносов IT-компаний на социальное страхование
    public calcSocialInsurance() {
        if (!this.isCivilContract) {
            const { exceedInsurancelLimit, insurance, insuranceBase } =
                this.calcInsuranceFixBase(this.socialLimit, this._socialRate);
            return {
                exceedSocialLimit: exceedInsurancelLimit,
                social: insurance,
                socialBase: insuranceBase,
            };
        } else {
            return { exceedSocialLimit: 0, social: 0, socialBase: 0 };
        }
    }
}
