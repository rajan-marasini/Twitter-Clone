import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/profile");

                if (data) {
                    setUser(data.user);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
