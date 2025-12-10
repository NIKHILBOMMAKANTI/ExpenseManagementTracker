'use client'
import { Box, Text, Stack, Center } from "@chakra-ui/react";
import PieChart from "./PieChart";
import DonutChart from "./DonutChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { TableOfContent } from "./TableofContent";
export function DashboardOverview() {
    const [pendingData, setpendingData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        try {
            const GetData = async () => {
                const url = '/api/approve/pending'
                const Token = localStorage.getItem("Token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                setpendingData(response?.data?.data);
            }
            GetData();
        } catch (error: any) {
            console.log("Error", error?.message);
        } finally {
            setTimeout(()=>{
                setIsLoading(false);
            },1000)
            
        }
    }, [])
    return (
        <>

            <Stack background="#EDEDED" padding="0.4rem">
                <Text color="#878787">Home/Dashboard</Text>
            </Stack>
            <Stack gap="4">
                <Stack gap="4" direction={{ base: "column", md: "row" }} justifyContent="space-around">
                    <Stack background="#EDEDED" borderRadius="15px" w={{ base: "90%", md: "45%" }} mx="auto">
                        <Text padding="1rem" color="#39619D" fontWeight="700">Expenses Overview</Text>
                        <PieChart />
                    </Stack>
                    <Stack background="#EDEDED" borderRadius="15px" w={{ base: "90%", md: "45%" }} mx="auto">
                        <Text padding="1rem" color="#39619D" fontWeight="700">Spending By Category</Text>
                        <DonutChart />
                    </Stack>
                </Stack>
                <Stack background="#EDEDED" borderRadius="15px" w={{ base: "90%", md: "95%" }} mx="auto">
                    <Text padding="1rem" color="#39619D" fontWeight="700">Pending Expenses</Text>
                    <TableOfContent pendingData={pendingData} isLoading={isLoading}/>
                </Stack>
            </Stack>
        </>
    )
}