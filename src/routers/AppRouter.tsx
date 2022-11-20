import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "../pages/about";
import Contacts from "../pages/contacts";
import Home from "../pages/home";
import Salary from "../pages/accrual/exports/components";
import Nds from "../pages/vat/exports/components";
import Calculator from "../pages/calculator/exports/components";
import Dividends from "../pages/dividends";
import Employees from "../pages/employees";
import FinesCalc from "../pages/fines/index";

const AppRouter: React.FC = () => {
    const rootPath = "/tax-calculator";
    return (
        <>
            <Routes>
                <Route path={rootPath} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={rootPath + "nds"} element={<Nds />} />
                    <Route path={rootPath + "about"} element={<About />} />
                    <Route
                        path={rootPath + "contacts"}
                        element={<Contacts />}
                    />
                    <Route path={rootPath + "accrual"} element={<Salary />} />
                    <Route
                        path={rootPath + "dividends"}
                        element={<Dividends />}
                    />
                    <Route
                        path={rootPath + "employees"}
                        element={<Employees />}
                    />
                    <Route
                        path={rootPath + "calculator"}
                        element={<Calculator />}
                    />
                    <Route path={rootPath + "fines"} element={<FinesCalc />} />
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
