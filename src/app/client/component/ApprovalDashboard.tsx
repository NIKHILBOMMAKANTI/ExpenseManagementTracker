import { Stack, Text, Box, Image, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react";
export function ApprovalDashboard({ data, isLoading }: any) {

    const [total, SetTotal] = useState(0);
    useEffect(() => {
        let totalValue: number = 0
        data?.map((Data: any) => {
            totalValue += Data?.value;
        })
        SetTotal(totalValue)
    }, [data])
    return (
        <>
            {
                (isLoading) ? (<Stack width="95%" margin="auto" direction={{ base: "column", md: "row" }}>
                    
                    {
                        ([1,2,3,4]).map((_,i)=>{
                            return(
                            <Box background="#EDEDED" width="100%" margin="auto" borderRadius="10px">
                                <Skeleton key={i} height="200px" width="100%" borderRadius="10px"/>
                            </Box>)
                        })

                    }
                   
                   </Stack>) : (
                    <Stack margin="1rem" direction={{ base: "column", md: "row" }}>
                        {
                            data?.map((Data: any, index: number) => {
                                return (
                                    <Stack width="95%" margin="auto" key={index}>
                                        <Box background="#EDEDED" width="100%" margin="auto" borderRadius="10px" borderBottom={`2.5px solid ${Data?.textcolor}`}>
                                            <Text display="flex" justifyContent="center" fontSize="1.25rem" color={`${Data?.textcolor}`} fontWeight="700" padding="1rem">{Data?.name}</Text>
                                            <Text display="flex" justifyContent="center" fontSize="2.5rem" fontWeight="700" padding="0.5rem">{Data?.value}</Text>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Image paddingRight="0.8rem" paddingBottom="1rem" src={Data?.icon} />
                                            </Box>
                                        </Box>
                                    </Stack>
                                )
                            })
                        }
                        <Stack width="95%" margin="auto">
                            <Box background="#EDEDED" width="100%" margin="auto" borderRadius="10px" borderBottom="2.5px solid #629BD9">
                                <Text display="flex" justifyContent="center" fontSize="1.25rem" color="#629BD9" fontWeight="700" padding="1rem">Total</Text>
                                <Text display="flex" justifyContent="center" fontSize="2.5rem" fontWeight="700" padding="0.5rem">{total}</Text>
                                <Box display="flex" justifyContent="flex-end">
                                    <Image paddingRight="0.8rem" paddingBottom="1rem" src="/TotalDashboard.png" />
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>)
            }
        </>
    )
}
