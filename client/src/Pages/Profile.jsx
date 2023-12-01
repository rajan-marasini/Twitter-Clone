import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";

const Profile = () => {
    const [person, setPerson] = useState({});

    let samePerson = false;

    const { user } = useContext(UserContext);

    const { id } = useParams();

    if (id == user.id) samePerson = true;
    const isFollowing = user?.followingIds.includes(id);

    const handleFollowUser = async (id) => {
        try {
            const { data } = await axios.post(`/api/v1/user/follow/${id}`);

            console.log(data);
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

    useEffect(() => {
        const getPerson = async () => {
            const { data } = await axios.get(`/api/v1/user/${id}`);

            setPerson(data.user);
        };
        getPerson();
    }, [id]);

    return (
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col w-full h-[30rem] border border-white border-opacity-60 relative">
                <div className="bg-gray-600 flex-1"></div>
                <div className="absolute h-32 w-32 top-1/2 -translate-y-1/2 bg-white rounded-full ml-2 overflow-hidden">
                    <img
                        src="/profile.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 relative">
                    {samePerson && (
                        <button className="absolute right-4 top-2 bg-primary px-4 py-2 font-semibold rounded-full">
                            EditProfile
                        </button>
                    )}
                    {!samePerson && (
                        <button
                            className="absolute right-4 top-2 bg-primary px-4 py-2 font-semibold rounded-full"
                            onClick={() => handleFollowUser(id)}
                        >
                            {isFollowing ? " Unfollow" : "Follow"}
                        </button>
                    )}
                    <div className="mt-20 px-4">
                        <h1 className="text-2xl font-black">{person?.name}</h1>
                        <p className="text-gray-500 leading-3">
                            @{person?.username}
                        </p>

                        <p className="flex gap-2 mt-3 items-center text-gray-500">
                            <span>
                                <FaCalendarAlt fill="gray" />
                            </span>
                            <span>
                                Joined{" "}
                                {new Date(person?.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }
                                )}
                            </span>
                        </p>

                        <div className="flex gap-4 mt-3 text-gray-500 items-center">
                            <p className="flex gap-1 items-center">
                                <span className="text-white font-bold text-xl">
                                    {person?.followingIds?.length}
                                </span>
                                <span>Following</span>
                            </p>
                            <p className="flex gap-1 items-center">
                                <span className="text-white font-bold text-xl">
                                    {person?.followersIds?.length}
                                </span>
                                <span>Followers</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
