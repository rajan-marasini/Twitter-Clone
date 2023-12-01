import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LeftSideBar from "../Components/SideBar/LeftSideBar";
import RightSideBar from "../Components/SideBar/RightSideBar";
import UserContext from "../context/userContext";

const HomePage = () => {
    const { user } = useContext(UserContext);

    return user ? (
        <div className="flex w-full h-[95vh]">
            <div className="col-span-1 ">
                <LeftSideBar />
            </div>
            <div className="col-span-2 border-r-2 border-l-2 border-white flex-1 p-4">
                <Outlet />
            </div>
            <div className="col-span-1 hidden lg:block">
                <RightSideBar />
            </div>
        </div>
    ) : (
        <Navigate to={"/"} />
    );
};

export default HomePage;
