import { SalaryTax } from "../exports/classes";
import { ISalaries, ISalaryClass } from "../exports/interfaces";
import { BasicRates, BusinessRates, StaticRates } from "../utils/salaryConsts";
/** 
    Содержит свойства и реализует методы расчета страховых взносов по коду тарифа 20 - малый бизнес
  */
export class SalaryBusinessTax extends SalaryTax implements ISalaryClass {
    private readonly _retireBusinessRate: number;
    private readonly _medicalBusinessRate: number;
    private readonly _socialBusinessRate: number;
    private readonly _retireBasicRate: number;
    private readonly _medicalBasicRate: number;
    private readonly _socialBasicRate: number;
    private readonly _accidentRate: number;

    constructor(
        state: ISalaries,
        salary: number,
        month: string,
        index: number
    ) {
        super(state, salary, month, index);

        this._retireBusinessRate = BusinessRates.retirement;
        this._medicalBusinessRate = BusinessRates.medical;
        this._socialBusinessRate = BusinessRates.social;
        this._retireBasicRate = BasicRates.retirement;
        this._medicalBasicRate = BasicRates.medical;
        this._socialBasicRate = BasicRates.social;
        this._accidentRate = StaticRates.accident;
    }

    /**  
     Расчет взносов малых организаций на НС и ПЗ
     */
    public calcAccidentInsurance(): number {
        return this.isCivilContract ? 0 : this.salary * this._accidentRate;
    }
    /**  
     Расчет взносов на медицинское страхование
     */
    public calcMedicalInsurance(): number {
        return this.calcInsuranceFloatBaseLimitless(
            this._medicalBasicRate,
            this._medicalBusinessRate
        );
    }
    /**
      Расчет взносов малых организаций на пенсионное страхование
    */
    public calcRetireInsurance = () => {
        const {
            exceedInsurancelLimit: exceedRetireLimit,
            insurance: retire,
            insuranceBase: retireBase,
            minimalInsurance: minimalretire,
        } = this.calcInsuranceFloatBase(
            this.retireLimit,
            this._retireBasicRate,
            this._retireBusinessRate
        );
        return {
            retire: retire + minimalretire,
            exceedRetireLimit,
            retireBase,
        };
    };
    /**
      Расчет взносов малых организаций на социальное страхование
    */
    public calcSocialInsurance() {
        if (!this.isCivilContract) {
            const {
                exceedInsurancelLimit: exceedSocialLimit,
                insurance: social,
                insuranceBase: socialBase,
                minimalInsurance: minimalSocial,
            } = this.calcInsuranceFloatBase(
                this.socialLimit,
                this._socialBasicRate,
                this._socialBusinessRate
            );
            return {
                social: social + minimalSocial,
                exceedSocialLimit,
                socialBase,
            };
        } else {
            return { social: 0, exceedSocialLimit: 0, socialBase: 0 };
        }
    }
}
