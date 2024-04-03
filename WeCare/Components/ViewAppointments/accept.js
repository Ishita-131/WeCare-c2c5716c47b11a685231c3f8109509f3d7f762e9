import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Alert } from "react-native";

const AcceptContext = createContext();

export function UseAccept() {
    return useContext(AcceptContext);
}

export function AcceptProvider({ children }) {
    const [accept, setAccept] = useState(false);
    const [ambassadors, setAmbassadors] = useState([]);
    const [users, setUser] = useState(null); // Initialize with null instead of an empty string
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true); // State to track loading state

    useEffect(() => {
        async function fetchData() {
            try {
                const { user } = await supabase.auth.getUser();
                setUser(user);
                Alert.alert("Gyatt")
            } catch (error) {
                console.error("Error fetching user:", error.message);
                // Handle error (e.g., set user to null)
            } finally {
                setLoading(false); // Mark loading as false regardless of success or failure
            }
        }

        fetchData();
    }, []); // Run once on component mount

    return (
        <AcceptContext.Provider value={{ accept, setAccept, ambassadors, setAmbassadors, users, setUser, date, setDate, loading }}>
            {children}
        </AcceptContext.Provider>
    );
}
