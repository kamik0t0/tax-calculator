import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "../pages/about";
import Contacts from "../pages/contacts";
import Home from "../pages/home";
// import SalaryLayout from "../pages/salary/layout/SalaryLayout";
import Salary from "../pages/salary/pages/accrual";
import Dividends from "../pages/salary/pages/dividends";
import Employees from "../pages/salary/pages/employees";
import Nds from "../pages/vat/exports/components";

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="nds" element={<Nds />} />
                    <Route path="about" element={<About />} />
                    <Route path="contacts" element={<Contacts />} />
                    {/* <Route path="salary/" element={<SalaryLayout />}> */}
                    <Route path="accrual" element={<Salary />} />
                    <Route path="dividends" element={<Dividends />} />
                    <Route path="employees" element={<Employees />} />
                    {/* </Route> */}
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
