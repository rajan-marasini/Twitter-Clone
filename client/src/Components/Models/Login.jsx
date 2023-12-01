import axios from "axios";
import React, { useContext, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../context/userContext";
import Input from "../Input";

const Login = ({ setRegisterModel, setLoginIsModelShowing }) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/user/login", {
                username,
                password,
            });

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
        <div
            className="w-full h-full inset-0 fixed bg-black bg-opacity-80
        "
        >
            <div
                className="
                    py-4
                    px-6
                    fixed
                    w-full
                    max-w-lg
                    max-h-96
                    top-1/4
                    rounded-2xl
                    z-10
                    mx-auto
                    inset-0
                    bg-white
                    text-black
    "
            >
                <div
                    className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-black
                    pb-2
            "
                >
                    <h2
                        className="
                        text-2xl 
                        font-bold
                        "
                    >
                        Login
                    </h2>
                    <IoCloseSharp
                        size={24}
                        className="cursor-pointer"
                        onClick={() => setLoginIsModelShowing(false)}
                    />
                </div>

                <form className="mt-4 flex flex-col gap-4">
                    <Input
                        label={"Username"}
                        type={"text"}
                        value={username}
                        setValue={setUsername}
                    />
                    <Input
                        label={"Password"}
                        type={"password"}
                        value={password}
                        setValue={setPassword}
                    />

                    <button
                        className="border py-2 rounded-lg bg-primary text-white font-bold hover:opacity-95"
                        onClick={handleSubmit}
                    >
                        Sign in
                    </button>
                </form>
                <p className="text-sm mt-8">
                    Don't have an account?{" "}
                    <span
                        className="text-primary cursor-pointer"
                        onClick={() => {
                            setLoginIsModelShowing(false);
                            setRegisterModel(true);
                        }}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
