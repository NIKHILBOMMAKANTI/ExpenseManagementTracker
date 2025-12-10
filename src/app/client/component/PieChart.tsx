'use client'
import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Legend, Label } from "recharts"
import { useEffect, useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import axios from 'axios'

interface ChartItem {
    name: string,
    value: number,
    color: string
}
export default function () {
    const [StatsSummary, setStatsSummary] = useState<ChartItem[]>([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const GetData = async () => {
            const url = "/api/approve/DashboardSummary";
            const Token = localStorage.getItem("Token");
            if (Token) {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                const DashboardSummary = [...response.data?.data]
                setStatsSummary(DashboardSummary);
            }
        }
        GetData();
    }, [])

    const chart = useChart<ChartItem>({
        data: StatsSummary,
    })
    return (
        <Flex justifyContent="center" paddingBottom="1rem" flexDirection="column">
            <Chart.Root height={200} chart={chart}>
                <PieChart >
                    <Pie
                        isAnimationActive={true}
                        data={chart.data}
                        outerRadius={100}
                        innerRadius={0}
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                        labelLine={false}
                        position="outside"
                        label={({name, value})=> `${name}: ${value}`}
                    >
                        {
                            chart.data.map((item: ChartItem) => {
                                return <Cell key={item.name} fill={chart.color(item.color)}></Cell>
                            })
                        }

                    </Pie>
                </PieChart>
            </Chart.Root>
            <Flex justifyContent="center" marginTop="2rem" flexWrap="wrap">
                {chart.data.map((item) => (
                    <Flex key={item.name} alignItems="center" marginX="0.5rem">
                        <Box width="12px" height="12px" bg={chart.color(item.color)} marginRight="0.25rem" />
                        <Text fontSize="sm">{item.name}</Text>
                    </Flex>
                )
                )}
            </Flex>
        </Flex>

    )
}
