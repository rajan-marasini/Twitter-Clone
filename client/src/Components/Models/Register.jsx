import axios from "axios";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Input from "../Input";

const Login = ({ setLoginIsModelShowing, setRegisterModel }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !password || !email || !name) {
            toast.error("Please fill all the input");
            return;
        }

        try {
            const { data } = await axios.post("/api/v1/user/register", {
                name,
                email,
                password,
                username,
            });

            if (data.success) {
                toast.success(data.message);
                setRegisterModel(false);
                setLoginIsModelShowing(true);
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
                    top-[10%]
                    h-max
                    rounded-2xl
                    z-10
                    mx-auto
                    inset-0
                    bg-white
                    text-black
                    pb-12
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
                        Register
                    </h2>
                    <IoCloseSharp
                        size={24}
                        className="cursor-pointer"
                        onClick={() => setRegisterModel(false)}
                    />
                </div>

                <form className="mt-4 flex flex-col gap-4">
                    <Input
                        label={"Full Name"}
                        type={"text"}
                        value={name}
                        setValue={setName}
                    />
                    <Input
                        label={"Username"}
                        type={"text"}
                        value={username}
                        setValue={setUsername}
                    />
                    <Input
                        label={"Email"}
                        type={"email"}
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        label={"Password"}
                        type={"password"}
                        value={password}
                        setValue={setPassword}
                    />

                    <button
                        className="border py-2 rounded-lg bg-primary text-white font-bold hover:opacity-95"
                        onClick={handleRegister}
                    >
                        Create Account
                    </button>
                </form>
                <p className="text-sm mt-8">
                    Already have and account?{" "}
                    <span
                        className="text-primary cursor-pointer"
                        onClick={() => {
                            setRegisterModel(false);
                            setLoginIsModelShowing(true);
                        }}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
