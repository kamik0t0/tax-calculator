import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
const Nds: React.FC = lazy(() => import("../pages/vat/exports/components"));
const Salary: React.FC = lazy(
    () => import("../pages/accrual/exports/components")
);
const About: React.FC = lazy(() => import("../pages/about"));
const Home: React.FC = lazy(() => import("../pages/home"));
const Contacts: React.FC = lazy(() => import("../pages/contacts"));
const Calculator: React.FC = lazy(
    () => import("../pages/calculator/exports/components")
);
const Dividends: React.FC = lazy(() => import("../pages/dividends"));
const Employees: React.FC = lazy(() => import("../pages/employees"));
const Fines: React.FC = lazy(() => import("../pages/fines"));

const AppRouter: React.FC = () => {
    const rootPath = "/tax-calculator";
    return (
        <>
            <Routes>
                <Route
                    path={rootPath}
                    element={
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Layout />
                        </Suspense>
                    }
                >
                    <Route
                        index
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "nds"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Nds />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "about"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <About />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "contacts"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Contacts />
                            </Suspense>
                        }
                    />

                    <Route
                        path={rootPath + "accrual"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Salary />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "dividends"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Dividends />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "employees"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Employees />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "calculator"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Calculator />
                            </Suspense>
                        }
                    />
                    <Route
                        path={rootPath + "fines"}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <Fines />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
};
export default AppRouter;
