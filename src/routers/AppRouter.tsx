import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "../pages/about";
import Contacts from "../pages/contacts";
import Home from "../pages/home";
import Salary from "../pages/salary/pages/accrual/exports/components";
import Nds from "../pages/vat/exports/components";
import Calculator from "../pages/calculator/exports/components";
import Dividends from "../pages/salary/pages/dividends";
import Employees from "../pages/salary/pages/employees";

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="nds" element={<Nds />} />
                    <Route path="about" element={<About />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="accrual" element={<Salary />} />
                    <Route path="dividends" element={<Dividends />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="calculator" element={<Calculator />} />
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
