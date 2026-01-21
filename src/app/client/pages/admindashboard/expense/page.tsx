'use client';
import { PageContext } from "@/app/client/context/PageProvider";
import { ExpenseManagement } from "@/app/client/component/ExpenseManagement";
import { useContext } from "react";

export default function expense(){
        const {page, setPage,expid,setExpid} = useContext(PageContext)!;
    return <ExpenseManagement setExpid={setExpid}/>
}
