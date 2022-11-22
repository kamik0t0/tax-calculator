export interface ISalaryTax {
    // Сумма начислений нарастающим итогом по сотруднику
    // calcMonthsCumulativeSalary(): {
    //     prevMonthsTotalSalary: number;
    //     currMonthsTotalSalary: number;
    // };
    // setIsCivilContract(): boolean;

    // расчет взносов с учетом лимита начисления по тарифам, где ставка применяется ко всей сумме начислений (FixBase)
    calcInsuranceFixBase(
        limit: number,
        rate: number
    ): {
        exceedInsurancelLimit: number;
        insurance: number;
        insuranceBase: number;
    };

    // расчет взносов с учетом лимита начисления по тарифам, где применяются разные ставки (FloatBase)
    calcInsuranceFloatBase(
        limit: number,
        basicRate: number,
        businessRate: number
    ): {
        exceedInsurancelLimit: number;
        insurance: number;
        insuranceBase: number;
        minimalInsurance: number;
    };
    // расчет взносов без учета лимита начисления (Limitless) по тарифам, где применяются разные ставки (FloatBase)
    calcInsuranceFloatBaseLimitless(
        basicRate: number,
        businessRate: number
    ): number;
}
