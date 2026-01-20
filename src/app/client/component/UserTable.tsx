'use client';
import { useContext, useState, useRef, useEffect } from "react";
import { Stack, Box, Table, Text, Button, Dialog, Card, Field, Input, Portal, Skeleton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { PageContext } from "../context/PageProvider";
import { ImCross } from "react-icons/im";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

interface FormType {
    firstname?: HTMLInputElement | null,
    lastname?: HTMLInputElement | null,
    email?: HTMLInputElement | null,
    password?: HTMLInputElement | null
}
interface SelectedUsertype {
    _id: string,
    Email: string,
    Firstname: string,
    Lastname: string,
    Password: string,
    Role: string,
    __v: number
}


export function UserTable({ data, heading, buttontxt, handleUserDelete, setUserUpdate, isLoading, GetData }: any) {
    const [selectedUser, setSelectedUser] = useState<SelectedUsertype | undefined>(undefined)
    const [isOpen, setisOpen] = useState(false);
    const { page, setPage } = useContext(PageContext)!;
    const FormData = useRef<FormType>({});

    const Headers = (data?.length > 0) ? Object.keys(data[0]) : [];
    Headers.unshift("S.No");
    Headers.push("Actions");
    console.log("Headers", Headers)

    const handleEdit = (Data: any) => {
        console.log("SetSelectedUserData", Data);
        setSelectedUser(Data);
        setisOpen(true);
    }
    const handleUserUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const userPayload = {
                Firstname: FormData?.current.firstname?.value,
                Lastname: FormData?.current.lastname?.value,
                Email: FormData?.current.email?.value,
                Password: FormData?.current.password?.value

            }
            const Token = localStorage.getItem("Token");
            if (Token) {

                const userid = selectedUser?._id;
                const url = `/api/users/${userid}`;
                const response = await axios.put(url, userPayload, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
                const responsepayload = await response?.data?.updatedUserData;
                setisOpen(false);
                await toast.success(`${responsepayload?.message}`, {
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
                await GetData()
                setTimeout(() => { setPage('user'); setUserUpdate(true) }, 2100);
            }

        } catch (error: any) {
            console.log(error);
        }
    }
    console.log("UserData", data);
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
                        <Button background="#37629F" variant="solid" onClick={() => { setPage("usercreation") }}>
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
                                                        if (TableHeader !== '__v' && TableHeader !== '_id' && TableHeader !== 'Password') {
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
                                                            <Table.Cell>{Data.Firstname}</Table.Cell>
                                                            <Table.Cell>{Data.Lastname}</Table.Cell>
                                                            <Table.Cell>{Data.Email}</Table.Cell>
                                                            <Table.Cell>{Data.Role}</Table.Cell>
                                                            <Table.Cell>
                                                                <Stack direction={{ base: "column", md: "row" }}>
                                                                    <Button background="#FCC02E" variant="solid" borderRadius="20px" data-userid={Data._id} onClick={() => { handleEdit(Data) }} paddingTop="0.5rem" paddingBottom="0.5rem" paddingLeft="1.25rem" paddingRight="1.25rem">
                                                                        Edit
                                                                    </Button>
                                                                    <Button background="#F6110E" variant="solid" borderRadius="20px" data-userid={Data._id} onClick={(e) => { handleUserDelete(e) }} paddingTop="0.5rem" paddingBottom="0.5rem" paddingLeft="1.25rem" paddingRight="1.25rem">
                                                                        Delete
                                                                    </Button>
                                                                </Stack>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    );
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

            <Dialog.Root key="center" placement="center" motionPreset="slide-in-bottom" open={isOpen} >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>

                        <Dialog.Content background="#EDEDED">
                            <Box display="flex" justifyContent="flex-end" padding="0.5rem 0.5rem 0 0.5rem" onClick={() => { setisOpen(false) }}>
                                <ImCross color="#37629F" fontWeight="700" />
                            </Box>
                            <Dialog.Header>
                                <Dialog.Title color="#37629F" fontWeight="700" fontSize="20px">Edit User</Dialog.Title>
                            </Dialog.Header>
                            <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED">
                                <Card.Body paddingTop="0.5rem">
                                    <Stack gap="4" w="full" direction="row">
                                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                                            <Field.Root >
                                                <Field.Label fontSize="15px">First Name</Field.Label>
                                                <Input border="1px solid #86A4C3" name="firstname" placeholder="Enter Your Firstname" defaultValue={selectedUser?.Firstname} ref={(el) => { FormData.current.firstname = el }} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label fontSize="15px">Last Name</Field.Label>
                                                <Input border="1px solid #86A4C3" name="lastname" placeholder="Enter Your Lastname" defaultValue={selectedUser?.Lastname} ref={(el) => { FormData.current.lastname = el }} />
                                            </Field.Root>
                                        </Stack>
                                    </Stack>
                                    <Stack w="full">
                                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} paddingTop="1rem">
                                            <Field.Root >
                                                <Field.Label fontSize="15px">Email</Field.Label>
                                                <Input border="1px solid #86A4C3" name="Email" placeholder="Enter Your Email" defaultValue={selectedUser?.Email} ref={(el) => { FormData.current.email = el }} />
                                            </Field.Root>
                                            <Field.Root >
                                                <Field.Label fontSize="15px">Password</Field.Label>
                                                <Input border="1px solid #86A4C3" type="password" name="Password" placeholder="Enter Your Password" ref={(el) => { FormData.current.password = el }} />
                                            </Field.Root>
                                        </Stack>
                                    </Stack>
                                    <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                                        <Button type="submit" background="#37629F" width={{ base: "100%", md: "20%" }} borderRadius="5px" onClick={(e) => { handleUserUpdate(e) }}>Update User</Button>
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
