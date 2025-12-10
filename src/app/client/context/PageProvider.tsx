'use client';
import { createContext, useState, ReactNode } from "react";

interface PageContexttype {
    page:string,
    setPage:React.Dispatch<React.SetStateAction<string>>;
}
export const PageContext = createContext<PageContexttype | null>(null);
export function PageProvider({ children }:{children:ReactNode}) {
    const [page, setPage] = useState("dashboard");
    return (
        <PageContext.Provider value={{page,setPage}}>
            {children}
        </PageContext.Provider>
    )
}