'use client'
import { useEffect, useState } from "react"
import { Stack, Text } from "@chakra-ui/react";
import { ExpenseTable } from "./ExpenseTable";
import axios from 'axios'

interface ExpenseManagementProp {
    setExpid: React.Dispatch<React.SetStateAction<number>>;
}
export function ExpenseManagement({ setExpid }: ExpenseManagementProp) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const GetData = async () => {
            try {
                const url = '/api/expense';
                const Token = localStorage.getItem("Token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
                setData(response?.data?.data);
            }catch(error:any){
                console.log("Error",error?.message)
            }finally{
                setTimeout(()=>{setIsLoading(false);},1000)
                
            }
        }
        GetData();
    }, [])
    return (

        <>
            <ExpenseTable data={data} heading="Expense Mangement" buttontxt="Add Expense" setExpid={setExpid} isLoading={isLoading}/>
        </>
    )
}