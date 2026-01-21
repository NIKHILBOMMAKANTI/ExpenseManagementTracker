'use client';
import { createContext, useState, ReactNode } from "react";

interface PageContexttype {
    page:string,
    setPage:React.Dispatch<React.SetStateAction<string>>;
    expid:number,
    setExpid:React.Dispatch<React.SetStateAction<number>>
}
export const PageContext = createContext<PageContexttype | null>(null);
export function PageProvider({ children }:{children:ReactNode}) {
    const [page, setPage] = useState("dashboard");
    const [expid,setExpid] = useState<number>(0);
    return (
        <PageContext.Provider value={{page,setPage,expid,setExpid}}>
            {children}
        </PageContext.Provider>
    )
}