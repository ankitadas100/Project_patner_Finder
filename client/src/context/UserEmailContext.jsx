import { createContext, useContext, useEffect, useState } from "react";
const EmailCtx = createContext(null);

export function EmailProvider({ children }) {
    const [email, setemail] = useState('');
    return (
        <EmailCtx.Provider value={{ email, setemail }}>
            {children}
        </EmailCtx.Provider>
    )
}
export const useEmail = () => useContext(EmailCtx);