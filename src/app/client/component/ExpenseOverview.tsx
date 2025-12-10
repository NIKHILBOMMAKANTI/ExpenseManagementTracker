'use client'
import { useContext, useEffect, useState, useRef } from "react";
import { Stack, Text, Box, Button, HStack, Heading, Dialog, Portal, Card, Field, Input, Textarea, NativeSelect, FileUpload, Image,Skeleton } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa6";
import { PageContext } from "../context/PageProvider";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';




interface ExpenseOverviewProp {
    heading: string,
    buttontxt: string
    expid: number
}

interface ExpenseDatatProp {
    amount: number,
    approverid: string,
    category: string,
    costCenter: string,
    createdAt: string,
    currency: string,
    description: string,
    s3key: string,
    status: string,
    title: string,
    formattedDate: string,
    userid: string,
    imagesignedurl: string | null,
    __v: number,
    _id: string
}

interface ExpenseFormDataProp {
    title?: HTMLInputElement | null,
    description?: HTMLTextAreaElement | null,
    category?: HTMLSelectElement | null,
    amount?: HTMLInputElement | null,
    receipt?: HTMLInputElement | null
}
export function ExpenseOverview({ heading, buttontxt, expid }: ExpenseOverviewProp) {
    const { page, setPage } = useContext(PageContext)!;
    const [expdata, setExpdata] = useState<ExpenseDatatProp>();
    const [isOpen, setisOpen] = useState(false);
    const [previewImg, setPreviewImg] = useState(false);
    const [refetch, setrefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const ExpenseFormData = useRef<ExpenseFormDataProp>({});

    useEffect(() => {
        const GetData = async () => {
            try {
                const url = `/api/expense/${expid}`;
                const response = await axios.get(url);
                let CreatedAt = response?.data?.data.createdAt
                let Year = CreatedAt.slice(0, 4);
                let Month = CreatedAt.slice(5, 7);
                let Day = CreatedAt.slice(8, 10);
                let formattedDate = `${Day}-${Month}-${Year}`;
                let Response = response?.data?.data
                Response['formattedDate'] = formattedDate
                setExpdata(Response);
            } catch (error: any) {
                console.log("Error", error.message)
            } finally {
                setTimeout(()=>{
                    setIsLoading(false);
                },1000)
                
            }
        }
        GetData();
    }, [expid, refetch])
    const handleDelete = (e: any) => {
        Swal.fire({
            title: "Delete Expense?",
            text: "Are you sure you want to delete this expense? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#37629F",
            confirmButtonText: "Remove Expense"

        }).then(async (result) => {
            let expid = e.target.dataset.expid
            const url = `/api/expense/${expid}`
            const response = await axios.delete(url);
            if (result.isConfirmed) {

                await toast.success(`${response?.data?.message}`, {
                    style: {
                        border: '1px solid #E53E3E',
                        padding: '16px',
                        color: '#E53E3E',
                    },
                    iconTheme: {
                        primary: '#E53E3E',
                        secondary: '#FFFAEE',
                    },
                });
                setTimeout(() => setPage('expense'), 2100);
            }

        })
    }
    const handleReject = async (e: any) => {
        try {
            let expid = e.target.dataset.expid
            const url = `/api/approve/reject/${expid}`
            const token = localStorage.getItem("Token");
            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let ResponseStatus = response?.data?.status
            let ResponseData = response?.data?.data;
            if (ResponseStatus == 200) {
                toast.success(`${response?.data?.message}`, {
                    style: {
                        border: '1px solid #E53E3E',
                        padding: '16px',
                        color: '#E53E3E',
                    },
                    iconTheme: {
                        primary: '#E53E3E',
                        secondary: '#FFFAEE',
                    },
                });
            }
            setrefetch((refetch) => !refetch);
        } catch (error) {
            console.log("Error", error)
        }

    }
    const handleApprove = async (e: any) => {
        try {
            let expid = e.target.dataset.expid
            const url = `/api/approve/${expid}`;
            const token = localStorage.getItem("Token");
            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let ResponseStatus = response?.data?.status
            if (ResponseStatus == 200) {
                toast.success(`${response?.data?.message}`, {
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
            }
            setrefetch((refetch) => !refetch);
        } catch (error) {
            console.log("Error", error)
        }
    }
    const handleEditExpense = async (e: any) => {
        try {
            let expid = e.target.dataset.expid
            const exppayload = new FormData();
            exppayload.append("title", ExpenseFormData.current.title?.value || '');
            exppayload.append("description", ExpenseFormData.current?.description?.value || '');
            exppayload.append("ammount", ExpenseFormData.current?.amount?.value || '')
            exppayload.append("category", ExpenseFormData.current?.category?.value || '')
            exppayload.append("receipt", ExpenseFormData.current.receipt?.files?.[0] || '')

            const url = `/api/expense/${expid}`;
            const response = await axios.put(url, exppayload);
            let ResponseStatus = response?.data?.status
            if (ResponseStatus == 200) {
                if (ExpenseFormData.current?.title?.value || ExpenseFormData.current?.description?.value || ExpenseFormData.current?.category?.value || ExpenseFormData.current?.amount?.value || ExpenseFormData.current?.receipt?.files?.length) {
                    ExpenseFormData.current.title!.value = "";
                    ExpenseFormData.current.description!.value = "";
                    ExpenseFormData.current.category!.value = "";
                    ExpenseFormData.current.amount!.value = "";
                    ExpenseFormData.current.receipt!.value = "";
                }
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
                setisOpen(false);
                setrefetch((refetch) => !refetch);
            }


        } catch (error) {
            console.log("Error", error);
        }
    }
    return (
        <>
            <Stack background="#EDEDED" padding="0.4rem">
                <Text color="#878787">Home/{heading}</Text>
            </Stack>
            <Stack padding="1rem" width="95%" background="#EDEDED" borderRadius="15px" margin="auto">
                <HStack justifyContent='space-between'>
                    <Box>
                        <Text color="#39619D" fontWeight="700" fontSize="1.25rem">{heading}</Text>
                    </Box>
                    <Box>
                        <Button background="#37629F" variant="solid" onClick={() => { setPage("expensecreation") }}>
                            <FaPlus /> {buttontxt}
                        </Button>
                    </Box>
                </HStack>
                {
                      (isLoading) ? (<Skeleton height="300px" width="100%" borderRadius="10px" />) : (  
                <HStack marginBottom='1rem' justifyContent='space-between'>
                    
                    
                    <Stack color="#39619D">
                        <Heading fontSize="1rem">Title:<span style={{ paddingLeft: '0.5rem' }}>{expdata?.title}</span></Heading>
                        <HStack>
                            <Text>Date:<span style={{ paddingLeft: '0.5rem' }}>{expdata?.formattedDate}</span></Text>
                            <Text marginLeft="2rem">Category:<span style={{ paddingLeft: '0.5rem' }}>{expdata?.category}</span></Text>
                        </HStack>
                        <HStack>
                            <Text>Amount:<span style={{ paddingLeft: '0.5rem' }}>{expdata?.amount} {expdata?.currency}</span></Text>
                            <Text marginLeft="2rem">Status:<span style={{ paddingLeft: '0.5rem' }}>{expdata?.status}</span></Text>
                        </HStack>
                        <Stack>
                            <Text>Description:<span style={{ paddingLeft: '0.5rem' }}>{expdata?.description}</span></Text>
                        </Stack>
                    </Stack>
                    <Stack height='200px' width='200px' border='3px dashed #b8b6b6' borderRadius='5px' marginTop='1rem'>
                        <Image src={expdata?.imagesignedurl || ""} alt={expdata?.title} width="100%" height="100%" padding='0.5rem' objectFit='fill' onClick={() => { setPreviewImg(true) }}></Image>
                    </Stack>
                   
                </HStack>
                 )
                    }
                <Stack>
                    <HStack justifyContent="center">
                        <Button colorPalette="red" variant="solid" data-expid={expdata?._id} onClick={(e) => { handleReject(e) }}>
                            <RxCross2 />Reject
                        </Button>
                        <Button colorPalette="green" variant="solid" data-expid={expdata?._id} onClick={(e) => { handleApprove(e) }}>
                            <TiTick />Approve
                        </Button>
                        <Button variant="surface" style={{ background: '#fcc02e', color: '#fff' }} onClick={() => { setisOpen(true) }}>
                            <FaEdit />
                            Edit
                        </Button>
                        <Button variant="surface" colorPalette="red" data-expid={expdata?._id} onClick={(e) => { handleDelete(e) }}>
                            <MdDelete />
                            Delete
                        </Button>
                        <Button background="#39619D" variant="solid" onClick={() => { setPage('expense') }}>
                            <FaArrowLeftLong />Back
                        </Button>
                    </HStack>
                </Stack>
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
                                <Dialog.Title color="#37629F" fontWeight="700" fontSize="20px" >Edit Expense</Dialog.Title>
                            </Dialog.Header>

                            <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED" >
                                <Card.Body paddingTop="0.5rem">
                                    <Stack direction={{ base: "column", md: "row" }} gap="6" w="full">
                                        <Box flex="2">
                                            <Stack gap="4" w="full" direction="row">
                                                <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                                                    <Field.Root >
                                                        <Field.Label fontSize="15px">Title</Field.Label>
                                                        <Input border="1px solid #86A4C3" name="title" placeholder="Enter Your Title" defaultValue={expdata?.title} ref={(el) => { ExpenseFormData.current.title = el }} />
                                                    </Field.Root>
                                                    <Field.Root>
                                                        <Field.Label fontSize="15px">Category</Field.Label>
                                                        <NativeSelect.Root border="1px solid #86A4C3" borderRadius="5px" >
                                                            <NativeSelect.Field defaultValue={expdata?.category} ref={(el) => { ExpenseFormData.current.category = el }}>
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
                                            <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} paddingTop="1rem">
                                                <Field.Root >
                                                    <Field.Label fontSize="15px">Ammount</Field.Label>
                                                    <Input border="1px solid #86A4C3" name="amount" placeholder="Enter Your Firstname" defaultValue={expdata?.amount} ref={(el) => { ExpenseFormData.current.amount = el }} />
                                                </Field.Root>
                                                <Field.Root >
                                                    <Field.Label fontSize="15px">Description</Field.Label>
                                                    <Textarea rows={1} border="1px solid #86A4C3" name="description" placeholder="Enter Your Description" defaultValue={expdata?.description} ref={(el) => { ExpenseFormData.current.description = el }} />
                                                </Field.Root>
                                            </Stack>
                                        </Box>
                                        <Box flex="1" backgroundColor="#EDEDED">
                                            <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10} >
                                                <FileUpload.HiddenInput ref={(el) => { ExpenseFormData.current.receipt = el }} />
                                                <FileUpload.Dropzone bg="#EDEDED" border="2px dashed  #CBCBCB" style={{ height: "175px", minHeight: "100px" }}>
                                                    <FileUpload.Trigger>
                                                        <Image src="/FileUpload.png" width="58px" height="58px" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }} />
                                                    </FileUpload.Trigger>
                                                    <FileUpload.DropzoneContent >
                                                        <Box>Drag and drop files here</Box>
                                                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                                                    </FileUpload.DropzoneContent>
                                                </FileUpload.Dropzone>
                                                <Box style={{ background: "#EDEDED" }}>
                                                    <FileUpload.List />
                                                </Box>
                                            </FileUpload.Root>
                                        </Box>
                                    </Stack>
                                    <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                                        <Button background="#37629F" width={{ base: "100%", md: "30%" }} borderRadius="5px" data-expid={expdata?._id} onClick={(e) => { handleEditExpense(e) }}>Update Expense</Button>
                                    </Stack>
                                </Card.Body>
                            </Card.Root>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            {/*Image Preview Dialog*/}
            <Dialog.Root placement="center" motionPreset="slide-in-bottom" open={previewImg} >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content background="#EDEDED">
                            <Box display="flex" justifyContent="flex-end" padding="0.5rem 0.5rem 0 0.5rem" onClick={() => { setPreviewImg(false) }}>
                                <ImCross color="#37629F" fontWeight="700" />
                            </Box>
                            <Dialog.Header>
                                <Dialog.Title color="#37629F" fontWeight="700" fontSize="20px">Preview</Dialog.Title>
                            </Dialog.Header>

                            <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED" >
                                <Card.Body paddingTop="0.5rem">
                                    <Stack direction={{ base: "column", md: "row" }} gap="6" w="full" display="flex" justifyContent="center" alignItems="center">

                                        <Image src={expdata?.imagesignedurl || ""} width="400px" height="400px" objectFit="contain"></Image>
                                    </Stack>
                                    <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                                        <Button background="#37629F" width={{ base: "100%", md: "30%" }} borderRadius="5px" onClick={() => { setPreviewImg(false) }}>Close Preview</Button>
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
