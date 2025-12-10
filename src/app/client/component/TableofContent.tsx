'use-client'
import { Stack, Table, Box, Text, Skeleton } from "@chakra-ui/react"

export function TableOfContent({ pendingData, isLoading }: any) {
    const Headers = (pendingData?.length > 0) ? Object.keys(pendingData[0]) : []
    Headers.unshift("S.No")
    return (
        <Stack padding="1rem" width="100%" >
            {
                (isLoading) ? (<Skeleton height="200px" width="100%" borderRadius="10px" />) : (
                    <Box w="100%" overflowX="auto" width={{ base: "300px", sm: "100%", md: "100%" }}>
                        {(pendingData && pendingData.length > 0) ? (
                            <Table.Root variant="outline" striped minWidth="300px" flexWrap="wrap" borderRadius="10px">
                                <Table.Header>
                                    <Table.Row background="#c3e0f8">
                                        {
                                            Headers.map((TableHeader, index) => {
                                                return (
                                                    <Table.ColumnHeader color="#39619D" fontWeight="700" key={index}>{TableHeader}</Table.ColumnHeader>
                                                )
                                            })
                                        }
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        pendingData?.map((PendExp: any, index: number) => {
                                            return (
                                                <Table.Row key={index} color="#39619D" style={{ background: index % 2 == 0 ? '#E4F3FF' : '#ffffff' }}>
                                                    <Table.Cell>{index + 1}</Table.Cell>
                                                    <Table.Cell>{PendExp.Title.slice(0, 20)}...</Table.Cell>
                                                    <Table.Cell>{PendExp?.Category}</Table.Cell>
                                                    <Table.Cell>{PendExp.Currency}</Table.Cell>
                                                    <Table.Cell>{PendExp.Amount}</Table.Cell>
                                                    <Table.Cell>{PendExp.Department}</Table.Cell>
                                                    <Table.Cell>{PendExp['Created At']}</Table.Cell>
                                                    <Table.Cell><span style={{ background: "#fcc02e", paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem', color: "#ffffff", borderRadius: "20px" }}>{PendExp.Status}</span></Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table.Root>) : (
                            <Text textAlign="center" color="gray.500" fontSize="lg" py="4">
                                Nothing to show here yet!!
                            </Text>
                        )
                        }
                    </Box>)
            }
        </Stack>
    )
}

