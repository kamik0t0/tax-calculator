import React from "react";
import CustomDrawer from "./components/nav/CustomDrawer";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.scss";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <CustomDrawer />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
