// context/UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

const [enableds, setenableds] = useState(false)
    const [enabledstwo, setenabledstwo] = useState(false)

    console.log(enabledstwo, 'enabledsenableds')
    console.log(enableds, 'enabledsenableds')


    
    return (
        <UserContext.Provider value={{ setenabledstwo, enabledstwo, setenableds, enableds, }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
