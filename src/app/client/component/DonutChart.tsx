'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip, Legend, Label } from "recharts"
import { Flex,Box,Text } from "@chakra-ui/react"

interface ExpenseItem {
    "_id": string,
    "title": string,
    "amount": number,
    "description": string,
    "category": string,
    "status": string,
    "userid": string,
    "approverid": string,
    "s3key": string,
    "currency": string,
    "createdAt": string,
    "costCenter": string,
    "__v": number
    "color"?: string

}
interface categoryDatatype{
    "category": string,
    "amount": number,
    "color"?: string,
    [key: string]: string | number | undefined;
}


export default function DonutChart() {
    const [categoryData, setCategoryData] = useState<categoryDatatype[]>([]);

    useEffect(() => {
        const GetData = async () => {
            const url = "/api/approve/spendingByCategory"
            const Token = localStorage.getItem("Token");
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            const responsepayload = response.data.data;
            setCategoryData(responsepayload);
        }
        GetData();
    }, [])
    const chart = useChart({
        data: categoryData
    })
    return (
        <Flex justifyContent="center" paddingBottom="1rem" flexDirection="column" marginTop="1.5rem">
            <Chart.Root height={200} chart={chart}>
                <PieChart>
                    <Tooltip
                        cursor={false}
                        animationDuration={100}
                        content={<Chart.Tooltip hideLabel />}
                    />
                    <Pie
                        innerRadius={70}
                        outerRadius={110}
                        isAnimationActive={true}
                        data={chart.data}
                        dataKey="amount"
                        nameKey="category"
                        stroke="none"
                        labelLine={false}
                        label={({category, amount})=> `${category}: ${amount}`}
                    >
                        {

                            chart?.data.map((item, index) => {
                                return <Cell key={index} fill={chart.color(item.color)}></Cell>
                            })
                        }
                        <Label position="center" value="Expense Breakdown" fill="#39619D" style={{ fontWeight: "bold" }} />

                    </Pie>
                </PieChart>

            </Chart.Root>
            <Flex justifyContent="center" marginTop="2rem" flexWrap="wrap">
                {chart.data.map((item) => (
                    <Flex key={item.category} alignItems="center" marginX="0.5rem">
                        <Box width="12px" height="12px" bg={chart.color(item.color)} marginRight="0.25rem" />
                        <Text fontSize="sm">{item.category}</Text>
                    </Flex>
                )
                )}
            </Flex>

        </Flex>
    );
}
