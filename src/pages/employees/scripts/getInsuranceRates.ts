export const getInsuranceRates = (rateCode: string) => {
    switch (rateCode) {
        case "20":
            return { ret: "10%", med: "5%", social: "0%", accident: "0.2%" };
        case "06":
            return { ret: "6%", med: "0.1%", social: "1.5%", accident: "0.2%" };
        default:
            return {
                ret: "22%",
                med: "5.1%",
                social: "2.9%",
                accident: "0.2%",
            };
    }
};
