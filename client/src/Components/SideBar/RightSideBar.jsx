import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../context/userContext";

const RightSideBar = () => {
    const { user } = useContext(UserContext);
    const [allPersons, setAllPersons] = useState([]);
    useEffect(() => {
        const getAllPersons = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/allUser");

                setAllPersons(data.allUsers);
            } catch (error) {
                console.log(error);
            }
        };

        getAllPersons();
    }, []);

    const handleFollowUser = async (id) => {
        try {
            const { data } = await axios.post(`/api/v1/user/follow/${id}`);

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="px-4">
            <h1
                className="text-2xl font-bold bg-gray-700
             px-4 py-2"
            >
                Who to follow
            </h1>

            <div className="flex flex-col gap-4">
                {allPersons.map((person, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between gap-2"
                    >
                        <Link
                            to={person?.id}
                            className="flex items-center justify-center gap-2 w-full"
                        >
                            <div className="h-8 w-8  rounded-full">
                                {person?.image ? (
                                    <img
                                        src={person?.profileImage}
                                        alt=""
                                        className="h-full w-full"
                                    />
                                ) : (
                                    <FaRegUserCircle className="h-full w-full" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold">{person?.name}</h4>
                                <p className="text-gray-500">
                                    @{person?.username}
                                </p>
                            </div>
                        </Link>
                        <button className="bg-primary px-3 py-1 rounded-full z-10">
                            <span onClick={() => handleFollowUser(person?.id)}>
                                {person?.followersIds?.includes(user?.id)
                                    ? "Unfollow"
                                    : "Follow"}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightSideBar;
