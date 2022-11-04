import { useTypedSelector } from "@reduxhooks/hooks";
import { ISalary } from "../exports/types";

export const useReport = (id: string) => {
    const { months } = useTypedSelector((state) => state.salarySlice);

    const employeeSalaries: number[] = [];
    const cumulativeSalary: number[] = [];
    const overSocialLimit: number[] = [];
    const cumulativeOverSocialLimit: number[] = [];
    const cumulativeOverRetirementLimit: number[] = [];
    const overRetirementLimit: number[] = [];

    const insuranceRetirement: number[] = [];
    const insuranceCumulativeRetirement: number[] = [];
    const insuranceMedical: number[] = [];
    const insuranceCumulativeMedical: number[] = [];
    const insuranceSocial: number[] = [];
    const insuranceCumulativeSocial: number[] = [];
    const insuranceAccident: number[] = [];
    const insuranceCumulativeAccident: number[] = [];

    const insuranceRetirementBase: number[] = [];
    const insuranceRetiremenCumulativetBase: number[] = [];
    const insuranceSocialBase: number[] = [];
    const insuranceSocialCumulativeBase: number[] = [];

    const PIT: number[] = [];
    const PITCumulativeArr: number[] = [];

    let cumulSalaryLimit = 0;
    let cumulSocialLimit = 0;
    let cumulRetirmentLimit = 0;

    let cumulRetirmentInsurance = 0;
    let cumulMedicalInsurance = 0;
    let cumulSocialInsurance = 0;
    let cumulAccidentInsurance = 0;

    let cumulRetirmentInsuranceBase = 0;
    let cumulSocialInsuranceBase = 0;

    let PITCumulative = 0;

    for (const month in months) {
        const salary: ISalary[] = months[month].salary;
        let isEmployeeAccrual = false;

        salary.forEach((accrual) => {
            if (accrual.employeeId === id) {
                cumulSalaryLimit += +accrual.accrued.toFixed(2);
                employeeSalaries.push(+accrual.accrued.toFixed(2));
                cumulativeSalary.push(+cumulSalaryLimit.toFixed(2));

                cumulSocialLimit += +accrual.overSocialLimit.toFixed(2);
                overSocialLimit.push(+accrual.overSocialLimit.toFixed(2));
                cumulativeOverSocialLimit.push(+cumulSocialLimit.toFixed(2));

                cumulRetirmentLimit += +accrual.overRetirmentLimit.toFixed(2);
                overRetirementLimit.push(
                    +accrual.overRetirmentLimit.toFixed(2)
                );
                cumulativeOverRetirementLimit.push(
                    +cumulRetirmentLimit.toFixed(2)
                );

                console.log(accrual.insurance.retirement.toFixed(2));

                cumulRetirmentInsurance +=
                    +accrual.insurance.retirement.toFixed(2);
                console.log(cumulRetirmentInsurance);

                insuranceRetirement.push(
                    +accrual.insurance.retirement.toFixed(2)
                );

                insuranceCumulativeRetirement.push(
                    +cumulRetirmentInsurance.toFixed(2)
                );
                console.log(insuranceCumulativeRetirement);

                cumulMedicalInsurance += +accrual.insurance.medical.toFixed(2);
                insuranceMedical.push(+accrual.insurance.medical.toFixed(2));
                insuranceCumulativeMedical.push(
                    +cumulMedicalInsurance.toFixed(2)
                );

                cumulSocialInsurance += +accrual.insurance.social.toFixed(2);
                insuranceSocial.push(+accrual.insurance.social.toFixed(2));
                insuranceCumulativeSocial.push(
                    +cumulSocialInsurance.toFixed(2)
                );

                cumulAccidentInsurance +=
                    +accrual.insurance.accident.toFixed(2);
                insuranceAccident.push(+accrual.insurance.accident.toFixed(2));
                insuranceCumulativeAccident.push(
                    +cumulAccidentInsurance.toFixed(2)
                );

                cumulRetirmentInsuranceBase +=
                    +accrual.insuranceRetirementBase.toFixed(2);
                insuranceRetirementBase.push(
                    +accrual.insuranceRetirementBase.toFixed(2)
                );
                insuranceRetiremenCumulativetBase.push(
                    +cumulRetirmentInsuranceBase.toFixed(2)
                );

                cumulSocialInsuranceBase +=
                    +accrual.insuranceSocialBase.toFixed(2);
                insuranceSocialBase.push(
                    +accrual.insuranceSocialBase.toFixed(2)
                );
                insuranceSocialCumulativeBase.push(
                    +cumulSocialInsuranceBase.toFixed(2)
                );

                PITCumulative += +accrual.tax.toFixed(2);
                PIT.push(+accrual.tax.toFixed(2));
                PITCumulativeArr.push(+PITCumulative.toFixed(2));

                isEmployeeAccrual = true;
            }
        });

        if (!isEmployeeAccrual) {
            employeeSalaries.push(0);
            cumulativeSalary.push(cumulSalaryLimit);
            overSocialLimit.push(0);
            cumulativeOverSocialLimit.push(cumulSocialLimit);
            overRetirementLimit.push(0);
            cumulativeOverRetirementLimit.push(cumulRetirmentLimit);

            insuranceRetirement.push(0);
            insuranceCumulativeRetirement.push(cumulRetirmentInsurance);
            insuranceMedical.push(0);
            insuranceCumulativeMedical.push(cumulMedicalInsurance);
            insuranceSocial.push(0);
            insuranceCumulativeSocial.push(cumulSocialInsurance);
            insuranceAccident.push(0);
            insuranceCumulativeAccident.push(cumulAccidentInsurance);

            insuranceSocialBase.push(0);
            insuranceSocialCumulativeBase.push(cumulSocialInsuranceBase);
            insuranceRetirementBase.push(0);
            insuranceRetiremenCumulativetBase.push(cumulRetirmentInsuranceBase);

            PIT.push(0);
            PITCumulativeArr.push(PITCumulative);
        }
    }

    return [
        employeeSalaries,
        cumulativeSalary,
        overSocialLimit,
        cumulativeOverSocialLimit,
        overRetirementLimit,
        cumulativeOverRetirementLimit,
        insuranceRetirement,
        insuranceCumulativeRetirement,
        insuranceMedical,
        insuranceCumulativeMedical,
        insuranceSocial,
        insuranceCumulativeSocial,
        insuranceAccident,
        insuranceCumulativeAccident,
        insuranceRetirementBase,
        insuranceRetiremenCumulativetBase,
        insuranceSocialBase,
        insuranceSocialCumulativeBase,
        PIT,
        PITCumulativeArr,
    ] as const;
};
