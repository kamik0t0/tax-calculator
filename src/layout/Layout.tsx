import { Outlet } from "react-router-dom";
import React from "react";
import { Button } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";

const Layout: React.FC = () => {
    // const dispatch = useTypedDispatch();
    // const { data } = useTypedSelector((state) => state.wrappedSlice);
    // console.log(data);

    return (
        <>
            {/* <Button
                onClick={() => {
                    const items = localStorage.getItem("sales");
                    if (items) {
                        dispatch(success(JSON.parse(items)));
                        dispatch(magic(JSON.parse(items)));
                    }
                }}
            >
                increment
            </Button> */}
            <Outlet />
        </>
    );
};

export default Layout;
