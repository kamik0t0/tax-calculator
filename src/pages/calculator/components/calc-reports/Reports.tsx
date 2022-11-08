import React from "react";
import BasicIEReport from "./IE/BasicIEReport";
import ExpensesIEReport from "./IE/ExpensesIEReport";
import IncomeIEReport from "./IE/IncomeIEReport";
import BasicLLCReport from "./LLC/BasicLLCReport";
import ExpensesLLCReport from "./LLC/ExpensesLLCReport";
import IncomeLLCReport from "./LLC/IncomeLLCReport";

const Reports: React.FC<{}> = () => {
    return (
        <>
            <IncomeIEReport />
            <IncomeLLCReport />
            <ExpensesIEReport />
            <ExpensesLLCReport />
            <BasicIEReport />
            <BasicLLCReport />
        </>
    );
};

export default Reports;
