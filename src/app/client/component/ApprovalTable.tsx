import { Stack, Box, Table, Text, Skeleton } from "@chakra-ui/react";

interface ColorPickerType {
    [key: string]: string,
}

export function ApprovalTable({ tabledata, isProcessing, activeTab }: any) {

    const Headers = (tabledata?.length > 0) ? Object.keys(tabledata[0]) : [];
    Headers.unshift("S.No")
    const ColorPicker: ColorPickerType = {
        "Approved": "#00ad45",
        "Rejected": "#f6110e",
        "Pending": "#FCC02E",
    }
    return (
        <>
            <Stack padding="1rem" width="95%" borderRadius="15px" margin="auto">
                {
                    (isProcessing[activeTab]) ? (<Skeleton height="200px" width="100%" borderRadius="10px" />) : (
                        <Box w="100%" overflowX="auto" width={{ base: "300px", sm: "100%", md: "100%" }}>
                            {(tabledata && tabledata.length > 0) ? (
                                <Table.Root variant="outline" striped minWidth="300px" flexWrap="wrap" borderRadius="10px">
                                    <Table.Header>

                                        <Table.Row background="#c3e0f8">
                                            {
                                                Headers.map((TableHeader, index) => {
                                                    if (TableHeader !== 'id' && TableHeader !== 'Description') {
                                                        return (
                                                            <Table.ColumnHeader color="#39619D" fontWeight="700" key={index}>{TableHeader}</Table.ColumnHeader>
                                                        )
                                                    }
                                                })
                                            }
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            tabledata?.map((Data: any, index: number) => {
                                                return (
                                                    <Table.Row key={index} color="#39619D" style={{ background: index % 2 == 0 ? '#E4F3FF' : '#ffffff' }} data-expid={Data.id}>
                                                        <Table.Cell>{index + 1}</Table.Cell>
                                                        <Table.Cell>{Data["Title"]}</Table.Cell>
                                                        <Table.Cell>{Data["Amount"]}</Table.Cell>
                                                        <Table.Cell>{Data["Currency"]}</Table.Cell>
                                                        <Table.Cell>{Data["Category"]}</Table.Cell>
                                                        <Table.Cell>{Data["Department"]}</Table.Cell>
                                                        <Table.Cell>{Data["Created At"]}</Table.Cell>
                                                        <Table.Cell><span style={{ background: `${ColorPicker[Data["Status"]]}`, paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', color: "#ffffff", borderRadius: "20px" }}>{Data["Status"]}</span></Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                        }
                                    </Table.Body>
                                </Table.Root>) : (
                                <Text textAlign="center" color="gray.500" fontSize="lg" py="4">
                                    Nothing to show here yet!!
                                </Text>
                            )}
                        </Box>)
                }
            </Stack>
        </>
    )
}