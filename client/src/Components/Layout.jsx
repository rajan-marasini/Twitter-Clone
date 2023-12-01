import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="w-full max-w-7xl p-8 mx-auto h-full">
            <Outlet />
        </div>
    );
};

export default Layout;
