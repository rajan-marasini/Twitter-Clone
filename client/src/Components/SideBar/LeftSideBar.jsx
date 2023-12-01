import axios from "axios";
import React, { useContext } from "react";
import { FaHome, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../asset/logo";
import UserContext from "../../context/userContext";

const LeftSideBar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const Lists = [
        {
            icon: <FaHome size={32} />,
            label: "Home",
            link: "/",
        },
        {
            icon: <FaSearch size={32} />,
            label: "Explore",
            link: "/explore",
        },
        {
            icon: <IoNotifications size={32} />,
            label: "Notification",
            link: "/notification",
        },
        {
            icon: <FaRegUserCircle size={32} />,
            label: "Profile",
            link: `/${user?.id}`,
        },
    ];

    const handleLogout = async () => {
        try {
            const { data } = await axios.post("/api/v1/user/logout");

            if (data.success) {
                toast.success(data.message);
                setUser(data.user);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="overflow-x-hidden overflow-y-auto w-full h-full relative px-4">
            <div>
                <div className="h-12 w-12 cursor-pointer text-white hover:bg-gray-500 rounded-full p-2 ">
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </div>

                <div className="flex flex-col gap-4 mt-12">
                    {Lists.map((list, i) => (
                        <Link
                            key={i}
                            to={list.link}
                            className="flex items-center gap-2 text-xl font-bold hover:bg-gray-500 w-fit px-4 py-2 rounded-full"
                        >
                            <span>{list.icon}</span>
                            <span className="hidden md:block ">
                                {list.label}
                            </span>
                        </Link>
                    ))}
                </div>
                <div
                    className="absolute bottom-0 
                    flex items-center hover:bg-gray-500 px-4 py-2  rounded-full cursor-pointer text-xl font-bold gap-2
                "
                    onClick={handleLogout}
                >
                    <span>
                        <MdOutlineLogout size={32} />
                    </span>
                    <span className="hidden md:inline">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;
