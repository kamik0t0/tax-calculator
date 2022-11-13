import { SalaryTax } from "../exports/classes";
import { ISalaries } from "../exports/interfaces";
import { BasicRates, StaticRates } from "../utils/salaryConsts";

export class SalaryBasicTax extends SalaryTax {
    private readonly _accidentRate: number;
    private readonly _medicalRate: number;
    private readonly _retireRate: number;
    private readonly _socialRate: number;

    constructor(
        state: ISalaries,
        salary: number,
        month: string,
        index: number
    ) {
        super(state, salary, month, index);
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
    public calcRetireInsurance(): {
        retire: number;
        exceedRetireLimit: number;
        retireBase: number;
    } {
        const { exceedInsurancelLimit, insurance, insuranceBase } =
            this.calcInsuranceFixBase(this.retireLimit, this._retireRate);
        return {
            exceedRetireLimit: exceedInsurancelLimit,
            retire: insurance,
            retireBase: insuranceBase,
        };
    }
    // расчет взносов по основному тарифу на социальное страхование
    public calcSocialInsurance(): {
        social: number;
        exceedSocialLimit: number;
        socialBase: number;
    } {
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
