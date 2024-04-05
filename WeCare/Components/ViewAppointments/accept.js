import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { getAmbassadors } from "./getAmbassadors";
import { getUser } from "./getUser";

const AcceptContext = createContext();

export function UseAccept() {
    return useContext(AcceptContext);
}

export function AcceptProvider({ children }) {
    const [accept, setAccept] = useState(false);
    const [ambassadors, setAmbassadors] = useState([]);
    const [users, setUser] = useState(null); // Initialize with null instead of an empty string
    const [date, setDate] = useState(new Date());
    const [refreshing , setRefresh] = useState(false)

    return (
        <AcceptContext.Provider value={{ accept, setAccept, ambassadors, setAmbassadors, users, setUser, date, setDate, refreshing, setRefresh }}>
            {children}
        </AcceptContext.Provider>
    );
}
