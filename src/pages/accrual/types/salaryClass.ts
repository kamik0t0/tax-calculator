export interface ISalaryClass {
    // расчет взносов с учетом лимита начисления по тарифам, где ставка применяется ко всей сумме начислений (FixBase)
    calcAccidentInsurance(): number;
    calcMedicalInsurance(): number;
    calcRetireInsurance(): {
        retire: number;
        exceedRetireLimit: number;
        retireBase: number;
    };
    calcSocialInsurance(): {
        social: number;
        exceedSocialLimit: number;
        socialBase: number;
    };
}
