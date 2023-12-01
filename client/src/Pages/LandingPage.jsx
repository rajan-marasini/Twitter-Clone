import React, { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import Login from "../Components/Models/Login";
import Register from "../Components/Models/Register";
import Logo from "../asset/logo";

const LandingPage = () => {
    const [isLoginModelShowing, setLoginIsModelShowing] = useState(false);
    const [registerModel, setRegisterModel] = useState(false);

    return (
        <div className="flex flex-col md:flex-row w-full gap-32">
            {!registerModel && isLoginModelShowing && (
                <Login
                    setRegisterModel={setRegisterModel}
                    setLoginIsModelShowing={setLoginIsModelShowing}
                />
            )}

            {!isLoginModelShowing && registerModel && (
                <Register
                    setLoginIsModelShowing={setLoginIsModelShowing}
                    setRegisterModel={setRegisterModel}
                />
            )}
            <div className="flex-1 hidden md:block">
                <Logo />
            </div>
            <div
                className="
                flex-1
                flex
                flex-col
                gap-2
                items-start
                justify-center
               
            "
            >
                <h1
                    className="
                    text-6xl
                    font-black
                    tracking-wider
                    mb-3
                "
                >
                    Happening now
                </h1>

                <h3
                    className="
                    text-2xl
                    font-black
                    my-4
                "
                >
                    Join today.
                </h3>

                <div className="max-w-xs">
                    <div className="w-full flex flex-col gap-3">
                        <button className="btn w-full bg-white text-black">
                            <FaGoogle size={24} fill="blue" />
                            <span>Sign up with Google</span>
                        </button>
                        <button className="btn font-bold w-full bg-white text-black">
                            <FaApple size={30} fill="black" />
                            <span>Sign up with Apple</span>
                        </button>
                    </div>

                    <p className="flex items-center justify-between  my-4">
                        <span className=" h-[1px] flex-1 bg-white rounded-full opacity-50"></span>
                        <span className="mx-2">or</span>
                        <span className="h-[1px] flex-1 bg-white rounded-full opacity-50"></span>
                    </p>

                    <button
                        className="
                        btn
                        w-full
                        flex 
                        justify-center
                        items-center
                        my-1
                        bg-primary
                        text-white
                        font-bold
                    "
                        onClick={() => setRegisterModel(true)}
                    >
                        Create account
                    </button>

                    <p className="text-xs text-gray-600">
                        By siging up, you agree to the{" "}
                        <span className="text-primary cursor-pointer">
                            Terms of services
                        </span>{" "}
                        and{" "}
                        <span className="text-primary cursor-pointer">
                            Privacy Policy
                        </span>
                        , including{" "}
                        <span className="text-primary cursor-pointer">
                            Cookie Use.
                        </span>
                    </p>

                    <h3 className="mt-8 font-bold">
                        Already have and account?
                    </h3>

                    <button
                        className="
                        btn
                        w-full
                        font-bold
                        text-center
                        text-primary
                        flex
                        justify-center
                        items-center
                        border
                        border-white
                    "
                        onClick={() => setLoginIsModelShowing(true)}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
