import { Card } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

// type MonthsType = {
//     value: number;
//     Jan: ISalary[];
//     Feb: ISalary[];
//     March: ISalary[];
//     April: ISalary[];
//     May: ISalary[];
//     June: ISalary[];
//     July: ISalary[];
//     Aug: ISalary[];
//     Sep: ISalary[];
//     Oct: ISalary[];
//     Nov: ISalary[];
//     Dec: ISalary[];
// };

// export function useMonths() {
//     return useOutletContext<MonthsType>();
// }

const SalaryLayout: React.FC = () => {
    return (
        <>
            <Card sx={{ width: "100vw", height: "90vh" }}>
                <Outlet />
            </Card>
        </>
    );
};

export default SalaryLayout;
