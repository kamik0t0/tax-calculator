import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import NDS from "../pages/NDS";
import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="nds" element={<NDS />} />
                    <Route path="about" element={<About />} />
                    <Route path="contacts" element={<Contacts />} />
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
