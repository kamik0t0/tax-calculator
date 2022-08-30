import React, { Dispatch, SetStateAction } from "react";
// import NDS from "./components/NDS";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import { CustomContext } from "./hooks/customContext";
import { ISummary } from "./interfaces/ISummary";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.scss";

export const InvoicesContext = CustomContext<{
    summary: ISummary;
    setSummary: Dispatch<SetStateAction<ISummary>>;
}>();
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <CustomDrawer />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
