import { SalaryTax } from "../exports/classes";
import { IEmployee, IMonths, ISalaryClass } from "../exports/interfaces";
import { BasicRates, StaticRates } from "../utils/salaryConsts";

/** 
    Содержит свойства и реализует методы расчета страховых взносов по коду тарифа 01 - основной тариф
  */
export class SalaryBasicTax extends SalaryTax implements ISalaryClass {
    private readonly _accidentRate: number;
    private readonly _medicalRate: number;
    private readonly _retireRate: number;
    private readonly _socialRate: number;

    constructor(
        months: IMonths,
        salary: number,
        month: string,
        index: number,
        employees: IEmployee[]
    ) {
        super(months, salary, month, index, employees);
        this._retireRate = BasicRates.retirement;
        this._socialRate = BasicRates.social;
        this._accidentRate = StaticRates.accident;
        this._medicalRate = BasicRates.medical;
    }
    // расчет взносов по основному тарифу на НС и ПЗ
    public calcAccidentInsurance(): number {
        return this.isCivilContract ? 0 : this.salary * this._accidentRate;
    }
    // расчет взносов по основному тарифу на медицинское страхование
    public calcMedicalInsurance(): number {
        return this.salary * this._medicalRate;
    }
    // расчет взносов по основному тарифу на пенсионное страхование
    public calcRetireInsurance() {
        const { exceedInsurancelLimit, insurance, insuranceBase } =
            this.calcInsuranceFixBase(this.retireLimit, this._retireRate);
        return {
            exceedRetireLimit: exceedInsurancelLimit,
            retire: insurance,
            retireBase: insuranceBase,
        };
    }
    // расчет взносов по основному тарифу на социальное страхование
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
