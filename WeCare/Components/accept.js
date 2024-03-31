import { useContext, createContext, useState } from "react";

const AcceptContext = createContext();

export function UseAccept() {
    return useContext(AcceptContext);
}

export function AcceptProvider({children}) {
    const [accept , setAccept] = useState(false);
    const [ambassadors , setAmbassadors] = useState();
    const [user, setUser] = useState('');
    const [date, setDate] = useState(null);
    return (<>
        <AcceptContext.Provider value={{accept, setAccept, ambassadors, setAmbassadors, user , setUser, date, setDate}} >
            {children}
        </AcceptContext.Provider>
    </>)
}