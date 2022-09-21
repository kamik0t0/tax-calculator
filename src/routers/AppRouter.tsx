import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "../pages/about";
import Contacts from "../pages/contacts";
import Home from "../pages/home";
import Nds from "../pages/vat/exports/components";
import Salary from "../pages/salary/exports/components";

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="nds" element={<Nds />} />
                    <Route path="about" element={<About />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="salary" element={<Salary />} />
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
