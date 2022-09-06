import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Nds from "../pages/nds/Nds";
import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="nds" element={<Nds />} />
                    <Route path="about" element={<About />} />
                    <Route path="contacts" element={<Contacts />} />
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
