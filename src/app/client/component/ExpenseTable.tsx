import { Stack, Box, Table, Text, Button, Skeleton } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { PageContext } from "../context/PageProvider";
import { FaPlus } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";





export function ExpenseTable({ data, heading, buttontxt, setExpid, isLoading }: any) {

    const Headers = (data?.length > 0) ? Object.keys(data[0]) : [];
    Headers.unshift("S.No")
    Headers.push("View");
    const { page, setPage } = useContext(PageContext)!;
    const route = useRouter();


    const handleView = (event: any) => {
        const expid = event.currentTarget.dataset.id;
        setExpid(expid);
        setPage('expenseoverview');
        route.push('/client/pages/admindashboard/expense/expenseoverview')
    }

    return (
        <>
            <Stack background="#EDEDED" padding="0.4rem" lineHeight="48px">
                <Text color="#878787">Home/{heading}</Text>
            </Stack>
            <Stack padding="1rem" width="95%" background="#EDEDED" borderRadius="15px" margin="auto">

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Text padding="1rem" color="#39619D" fontWeight="700">{heading}</Text>
                    </Box>
                    <Box>
                        <Button background="#37629F" variant="solid" onClick={() => { setPage("expensecreation"); route.push('/client/pages/admindashboard/expense/expensecreation')}}>
                            <FaPlus /> {buttontxt}
                        </Button>
                    </Box>
                </Stack>
                <Box w="100%" overflowX="auto" width={{ base: "300px", sm: "100%", md: "100%" }}>

                    {
                        (isLoading) ? (<Skeleton height="300px" width="100%" borderRadius="10px" />) : (
                            <Table.Root variant="outline" striped minWidth="300px" flexWrap="wrap" borderRadius="10px">
                                {
                                    (data && data.length > 0)?(
                                    <Table.Header>
                                        <Table.Row background="#c3e0f8">
                                            {
                                                Headers.map((TableHeader, index) => {
                                                    if (TableHeader !== 'id' && TableHeader !== 'color') {
                                                        return (
                                                            <Table.ColumnHeader color="#39619D" fontWeight="700" key={index}>{TableHeader}</Table.ColumnHeader>
                                                        )
                                                    }
                                                })
                                            }
                                        </Table.Row>
                                    </Table.Header>):(<Text textAlign="center" color="gray.500" fontSize="lg" py="4">
                                    Nothing to show here yet!!
                                </Text>)
                                }
                                <Table.Body>
                                    {
                                        data?.map((Data: any, index: number) => {
                                            return (
                                                <Table.Row key={index} color="#39619D" style={{ background: index % 2 == 0 ? '#E4F3FF' : '#ffffff' }} data-expid={Data.id}>
                                                    <Table.Cell>{index + 1}</Table.Cell>
                                                    <Table.Cell>{Data.Title}</Table.Cell>
                                                    <Table.Cell>{Data.Category}</Table.Cell>
                                                    <Table.Cell>{Data.Amount}</Table.Cell>
                                                    <Table.Cell>{Data.Currency}</Table.Cell>
                                                    <Table.Cell>{Data.Department}</Table.Cell>
                                                    <Table.Cell>{Data.Date}</Table.Cell>
                                                    <Table.Cell ><span style={{ background: `${Data.color}`, paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem', color: "#ffffff", borderRadius: "20px" }}>{Data.Status}</span></Table.Cell>
                                                    <Table.Cell data-id={Data.id} onClick={(event) => handleView(event)}><IoEyeOutline style={{ width: '26px', height: '26px' }} /></Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table.Root>)
                    }
                </Box>
            </Stack>
        </>
    )
}