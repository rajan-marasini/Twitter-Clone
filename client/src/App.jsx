import React, { useContext } from "react";
import Layout from "./Components/Layout";

import { Route, Routes } from "react-router-dom";
import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import Notification from "./Pages/Notification";
import Profile from "./Pages/Profile";
import UserContext from "./context/userContext";

const App = () => {
    const { user } = useContext(UserContext);
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={user?.name ? <HomePage /> : <LandingPage />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/:id" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
