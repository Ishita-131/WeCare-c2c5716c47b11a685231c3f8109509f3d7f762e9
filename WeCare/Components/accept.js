import { useContext, createContext, useState } from "react";

const AcceptContext = createContext();

export function UseAccept() {
    return useContext(AcceptContext);
}

export function AcceptProvider({children}) {
    const [accept , setAccept] = useState(false);
    const [ambassadors , setAmbassadors] = useState();

    return (<>
        <AcceptContext.Provider value={{accept, setAccept, ambassadors, setAmbassadors}} >
            {children}
        </AcceptContext.Provider>
    </>)
}