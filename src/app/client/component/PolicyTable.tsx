import { Stack, Box, Table, Text, Button, Field, Dialog, Portal, Card, Input, Textarea, NativeSelect, Skeleton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { PageContext } from "../context/PageProvider";
import { useContext, useState, useRef } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

interface FormDataProp {
    name: HTMLInputElement | null,
    description: HTMLTextAreaElement | null,
    limitAmount: HTMLInputElement | null,
    effectiveDate: HTMLInputElement | null,
    expiryDate: HTMLInputElement | null,
    category: HTMLSelectElement | null,
}
interface PolicyDataProp {
    _id: string | null,
    name: string | null,
    description: string | null,
    limitAmount: number | null,
    effectiveDate: string | null,
    expiryDate: string | null,
    category: string | null,
}
export function PolicyTable({ data, heading, buttontxt, handlePolicyDelete, isLoading, GetData }: any) {
    const [isOpen, setisOpen] = useState(false);
    const [policydata, setPolicyData] = useState<PolicyDataProp>();
    const FormData = useRef<Partial<FormDataProp>>({});
    const Headers = (data?.length > 0) ? Object.keys(data[0]) : [];
    Headers.unshift("S.No")
    Headers.push("Actions");
    const { page, setPage } = useContext(PageContext)!;
    const handlePolicy = async (e: any) => {
        try {
            setisOpen(true);
            setPolicyData(undefined);
            let policyid = e.target.dataset.policyid
            const GetSpecificPolicy = async () => {
                const url = `/api/policy/${policyid}`
                const token = localStorage.getItem("Token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const Response = response?.data?.data
                const Expdate = Response.expiryDate.slice(0, 10)
                Response['expiryDate'] = Expdate

                const Effdate = Response.effectiveDate.slice(0, 10);
                Response['effectiveDate'] = Effdate

                setPolicyData(Response);



            }
            GetSpecificPolicy()
        } catch (error) {
            console.log("Error", error);
        }

    }
    const handlePolicyUpdate = async (e: any) => {
        try {
            const policyid = policydata?._id
            if (!FormData.current) return;
            const updatepayload = {
                name: FormData.current.name?.value,
                description: FormData.current.description?.value,
                limitAmount: FormData.current.limitAmount?.value,
                effectiveDate: FormData.current.effectiveDate?.value,
                expiryDate: FormData.current.expiryDate?.value,
                category: FormData.current.category?.value,
            }
            const url = `/api/policy/${policyid}`;
            const token = localStorage.getItem('Token');
            const response = await axios.put(url, updatepayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const ResponseStatus = response?.data?.status;
            if (ResponseStatus === 200) {
                setisOpen(false);
                await toast.success(`${response?.data?.message}`, {
                    style: {
                        border: '1px solid #38A169',
                        padding: '16px',
                        color: '#38A169',
                    },
                    iconTheme: {
                        primary: '#38A169',
                        secondary: '#FFFAEE',
                    },
                });
                await GetData();
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    console.log("Policydata", policydata);
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
                        <Button background="#37629F" variant="solid" onClick={() => { setPage('policycreation') }}>
                            <FaPlus /> {buttontxt}
                        </Button>
                    </Box>
                </Stack>
                {
                    (isLoading) ? (<Skeleton height="300px" width="100%" borderRadius="10px" />) : (
                        <Box w="100%" overflowX="auto" width={{ base: "300px", sm: "100%", md: "100%" }}>
                            {
                                (data && data.length > 0) ? (
                                    <Table.Root variant="outline" striped minWidth="300px" flexWrap="wrap" borderRadius="10px">
                                        <Table.Header>
                                            <Table.Row background="#c3e0f8">
                                                {
                                                    Headers.map((TableHeader, index) => {
                                                        if (TableHeader !== 'id' && TableHeader !== 'Description' && TableHeader !== 'Currency') {
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
                                                data?.map((Data: any, index: number) => {
                                                    return (
                                                        <Table.Row key={index} color="#39619D" style={{ background: index % 2 == 0 ? '#E4F3FF' : '#ffffff' }} >
                                                            <Table.Cell>{index + 1}</Table.Cell>
                                                            <Table.Cell>{Data["Policy Name"]}</Table.Cell>
                                                            <Table.Cell>{Data.Category}</Table.Cell>
                                                            <Table.Cell>{Data["Limit Amount"]}</Table.Cell>
                                                            <Table.Cell>{Data["Effective Date"]}</Table.Cell>
                                                            <Table.Cell>{Data["Expiry Date"]}</Table.Cell>
                                                            <Table.Cell>{Data["Created Date"]}</Table.Cell>
                                                            <Table.Cell>
                                                                <Stack direction={{ base: "column", md: "row" }}>
                                                                    <Button background="#FCC02E" variant="solid" borderRadius="20px" data-policyid={Data.id} paddingTop="0.5rem" paddingBottom="0.5rem" paddingLeft="1.25rem" paddingRight="1.25rem" onClick={(e) => { handlePolicy(e) }}>
                                                                        Edit
                                                                    </Button>
                                                                    <Button background="#F6110E" variant="solid" borderRadius="20px" data-policyid={Data.id} onClick={(e) => { handlePolicyDelete(e) }} paddingTop="0.5rem" paddingBottom="0.5rem" paddingLeft="1.25rem" paddingRight="1.25rem">
                                                                        Delete
                                                                    </Button>
                                                                </Stack>
                                                            </Table.Cell>
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

            <Dialog.Root key="center" placement="center" motionPreset="slide-in-bottom" open={isOpen} >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content background="#EDEDED">
                            <Box display="flex" justifyContent="flex-end" padding="0.5rem 0.5rem 0 0.5rem" onClick={() => { setisOpen(false) }}>
                                <ImCross color="#37629F" fontWeight="700" />
                            </Box>
                            <Dialog.Header>
                                <Dialog.Title color="#37629F" fontWeight="700" fontSize="20px">Edit Policy</Dialog.Title>
                            </Dialog.Header>
                            <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED">
                                <Card.Body paddingTop="0.5rem">
                                    <Stack gap="4" w="full" direction="row">
                                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                                            <Field.Root >
                                                <Field.Label fontSize="15px">Policy Name</Field.Label>
                                                <Input border="1px solid #86A4C3" name="policyname" placeholder="Enter Policy Name" defaultValue={policydata?.name || ""} ref={(el) => { FormData.current.name = el }} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label fontSize="15px">Category</Field.Label>
                                                <NativeSelect.Root border="1px solid #86A4C3" borderRadius="5px" >
                                                    <NativeSelect.Field ref={(el) => { FormData.current.category = el }} value={policydata?.category || ""}>
                                                        <option value="Staff Expenses">Staff Expenses</option>
                                                        <option value="Operational Expenses">Operational Expenses</option>
                                                        <option value="Administrative Expenses">Administrative Expenses</option>
                                                        <option value="Travel Expenses">Travel Expenses</option>
                                                        <option value="Project Expenses">Project Expenses</option>
                                                        <option value="Miscellaneous Expenses">Miscellaneous Expenses</option>
                                                    </NativeSelect.Field>
                                                    <NativeSelect.Indicator />
                                                </NativeSelect.Root>
                                            </Field.Root>
                                        </Stack>
                                    </Stack>
                                    <Stack gap="4" w="full" direction="row" paddingTop="1rem">
                                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                                            <Field.Root >
                                                <Field.Label fontSize="15px">Effective Date</Field.Label>
                                                <Input type="date" border="1px solid #86A4C3" name="effectiveDate" ref={(el) => { FormData.current.effectiveDate = el }} defaultValue={policydata?.effectiveDate || ''} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label fontSize="15px">Expiry Date</Field.Label>
                                                <Input type="date" border="1px solid #86A4C3" name="expiryDate" variant="outline" placeholder="Enter Effective Date" defaultValue={policydata?.expiryDate || ''} ref={(el) => { FormData.current.expiryDate = el }} />
                                            </Field.Root>
                                        </Stack>
                                    </Stack>
                                    <Stack gap="4" w="full" direction="row" paddingTop="1rem">
                                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                                            <Field.Root >
                                                <Field.Label fontSize="15px">Description</Field.Label>
                                                <Textarea rows={1} border="1px solid #86A4C3" name="description" defaultValue={policydata?.description || ""} ref={(el) => { FormData.current.description = el }} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label fontSize="15px">Limit Amount</Field.Label>
                                                <Input border="1px solid #86A4C3" name="limitAmount" variant="outline" placeholder="Enter Limit Amount" defaultValue={policydata?.limitAmount || ""} ref={(el) => { FormData.current.limitAmount = el }} />
                                            </Field.Root>
                                        </Stack>
                                    </Stack>
                                    <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                                        <Button type="submit" background="#37629F" width={{ base: "100%", md: "20%" }} borderRadius="5px" onClick={(e) => { handlePolicyUpdate(e) }}>Update Policy</Button>
                                    </Stack>
                                </Card.Body>
                            </Card.Root>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            <Toaster position="top-right" />
        </>
    )
}