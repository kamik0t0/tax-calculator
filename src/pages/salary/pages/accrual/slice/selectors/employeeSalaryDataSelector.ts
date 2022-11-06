import { createSelector } from "@reduxjs/toolkit";
import { State } from "types/state";
import { ISalary } from "../../exports/interfaces";

const employeeSalaryData = (state: State) => {
    const { months } = state.salarySlice;
    const { id } = state.salarySlice.employee;

    const employeeSalaries: number[] = [];
    const cumSalary: number[] = [];
    const overSocialLimit: number[] = [];
    const cumOverSocialLimit: number[] = [];
    const cumOverRetirementLimit: number[] = [];
    const overRetirementLimit: number[] = [];

    const insuranceRetirement: number[] = [];
    const insurancecumRetirement: number[] = [];
    const insuranceMedical: number[] = [];
    const insurancecumMedical: number[] = [];
    const insuranceSocial: number[] = [];
    const insurancecumSocial: number[] = [];
    const insuranceAccident: number[] = [];
    const insurancecumAccident: number[] = [];

    const insuranceRetirementBase: number[] = [];
    const insuranceRetiremencumtBase: number[] = [];
    const insuranceSocialBase: number[] = [];
    const insuranceSocialcumBase: number[] = [];

    const PIT: number[] = [];
    const PITcumArr: number[] = [];

    let cumulSalaryLimit = 0;
    let cumulSocialLimit = 0;
    let cumulRetirmentLimit = 0;

    let cumulRetirmentInsurance = 0;
    let cumulMedicalInsurance = 0;
    let cumulSocialInsurance = 0;
    let cumulAccidentInsurance = 0;

    let cumulRetirmentInsuranceBase = 0;
    let cumulSocialInsuranceBase = 0;

    let PITcum = 0;

    for (const month in months) {
        const salary: ISalary[] = months[month].salary;
        let isEmployeeAccrual = false;

        salary.forEach((accrual) => {
            if (accrual.employeeId === id) {
                cumulSalaryLimit += +accrual.accrued.toFixed(2);
                employeeSalaries.push(+accrual.accrued.toFixed(2));
                cumSalary.push(+cumulSalaryLimit.toFixed(2));

                cumulSocialLimit += +accrual.overSocialLimit.toFixed(2);
                overSocialLimit.push(+accrual.overSocialLimit.toFixed(2));
                cumOverSocialLimit.push(+cumulSocialLimit.toFixed(2));

                cumulRetirmentLimit += +accrual.overRetirmentLimit.toFixed(2);
                overRetirementLimit.push(
                    +accrual.overRetirmentLimit.toFixed(2)
                );
                cumOverRetirementLimit.push(+cumulRetirmentLimit.toFixed(2));

                cumulRetirmentInsurance +=
                    +accrual.insurance.retirement.toFixed(2);

                insuranceRetirement.push(
                    +accrual.insurance.retirement.toFixed(2)
                );

                insurancecumRetirement.push(
                    +cumulRetirmentInsurance.toFixed(2)
                );

                cumulMedicalInsurance += +accrual.insurance.medical.toFixed(2);
                insuranceMedical.push(+accrual.insurance.medical.toFixed(2));
                insurancecumMedical.push(+cumulMedicalInsurance.toFixed(2));

                cumulSocialInsurance += +accrual.insurance.social.toFixed(2);
                insuranceSocial.push(+accrual.insurance.social.toFixed(2));
                insurancecumSocial.push(+cumulSocialInsurance.toFixed(2));

                cumulAccidentInsurance +=
                    +accrual.insurance.accident.toFixed(2);
                insuranceAccident.push(+accrual.insurance.accident.toFixed(2));
                insurancecumAccident.push(+cumulAccidentInsurance.toFixed(2));

                cumulRetirmentInsuranceBase +=
                    +accrual.insuranceRetirementBase.toFixed(2);
                insuranceRetirementBase.push(
                    +accrual.insuranceRetirementBase.toFixed(2)
                );
                insuranceRetiremencumtBase.push(
                    +cumulRetirmentInsuranceBase.toFixed(2)
                );

                cumulSocialInsuranceBase +=
                    +accrual.insuranceSocialBase.toFixed(2);
                insuranceSocialBase.push(
                    +accrual.insuranceSocialBase.toFixed(2)
                );
                insuranceSocialcumBase.push(
                    +cumulSocialInsuranceBase.toFixed(2)
                );

                PITcum += +accrual.tax.toFixed(2);
                PIT.push(+accrual.tax.toFixed(2));
                PITcumArr.push(+PITcum.toFixed(2));

                isEmployeeAccrual = true;
            }
        });

        if (!isEmployeeAccrual) {
            employeeSalaries.push(0);
            cumSalary.push(cumulSalaryLimit);
            overSocialLimit.push(0);
            cumOverSocialLimit.push(cumulSocialLimit);
            overRetirementLimit.push(0);
            cumOverRetirementLimit.push(cumulRetirmentLimit);

            insuranceRetirement.push(0);
            insurancecumRetirement.push(cumulRetirmentInsurance);
            insuranceMedical.push(0);
            insurancecumMedical.push(cumulMedicalInsurance);
            insuranceSocial.push(0);
            insurancecumSocial.push(cumulSocialInsurance);
            insuranceAccident.push(0);
            insurancecumAccident.push(cumulAccidentInsurance);

            insuranceSocialBase.push(0);
            insuranceSocialcumBase.push(cumulSocialInsuranceBase);
            insuranceRetirementBase.push(0);
            insuranceRetiremencumtBase.push(cumulRetirmentInsuranceBase);

            PIT.push(0);
            PITcumArr.push(PITcum);
        }
    }
    return [
        employeeSalaries,
        cumSalary,
        overSocialLimit,
        cumOverSocialLimit,
        overRetirementLimit,
        cumOverRetirementLimit,
        insuranceRetirement,
        insurancecumRetirement,
        insuranceMedical,
        insurancecumMedical,
        insuranceSocial,
        insurancecumSocial,
        insuranceAccident,
        insurancecumAccident,
        insuranceRetirementBase,
        insuranceRetiremencumtBase,
        insuranceSocialBase,
        insuranceSocialcumBase,
        PIT,
        PITcumArr,
    ];
};

export const employeeSalaryDataSelector = createSelector(
    employeeSalaryData,
    (rates) => rates
);
