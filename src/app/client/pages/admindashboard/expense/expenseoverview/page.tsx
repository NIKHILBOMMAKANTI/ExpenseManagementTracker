'use client';  

import { ExpenseOverview } from "@/app/client/component/ExpenseOverview";
import { PageContext } from "@/app/client/context/PageProvider";
import { useContext } from "react";

export default function Expenseoverview(){
    const {page, setPage,expid,setExpid} = useContext(PageContext)!;
    return <ExpenseOverview heading="Expense Mangement" buttontxt="Add Expense" expid={expid}/>
}