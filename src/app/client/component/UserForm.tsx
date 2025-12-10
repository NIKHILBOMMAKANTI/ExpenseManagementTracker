'use client'
import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import { useRef,useContext } from "react";
import { PageContext } from "../context/PageProvider";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface FormType {
    firstanme?: HTMLInputElement | null,
    lastname?: HTMLInputElement | null,
    email?: HTMLInputElement | null,
    password?: HTMLInputElement | null
}
export function UserForm() {
    const {page, setPage} = useContext(PageContext)!;
    const FormData = useRef<FormType>({});
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const userPayload = {
                firstname: FormData.current.firstanme?.value,
                lastname: FormData.current.lastname?.value,
                email: FormData.current.email?.value,
                password: FormData.current.password?.value

            }
            const url = "/api/users";
            const Token = localStorage.getItem("Token");
            if (Token) {
                const response = await axios.post(url, userPayload, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
                const ResponsePayload = response?.data
                await toast.success(`${ResponsePayload?.message}`, {
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

                setTimeout(() => setPage('user'), 2000);
            }

        } catch (error: any) {
            const Error = error.response?.data
            toast.error(`${Error.message}`, {
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
    }

    return (
        <>
        <form onSubmit={(e) => { handleSubmit(e) }}>
            <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED" >
                <Card.Body paddingTop="0.5rem">
                    <Stack gap="4" w="full" direction="row">
                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                            <Field.Root >
                                <Field.Label fontSize="15px">First Name</Field.Label>
                                <Input border="1px solid #86A4C3" name="firstname" placeholder="Enter Your Firstname" ref={(el) => { FormData.current.firstanme = el }} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label fontSize="15px">Last Name</Field.Label>
                                <Input border="1px solid #86A4C3" name="lastname" placeholder="Enter Your Lastname" ref={(el) => { FormData.current.lastname = el }} />
                            </Field.Root>
                        </Stack>
                    </Stack>
                    <Stack w="full">
                        <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} paddingTop="1rem">
                            <Field.Root >
                                <Field.Label fontSize="15px">Email</Field.Label>
                                <Input border="1px solid #86A4C3" name="Email" placeholder="Enter Your Email" ref={(el) => { FormData.current.email = el }} />
                            </Field.Root>
                            <Field.Root >
                                <Field.Label fontSize="15px">Password</Field.Label>
                                <Input border="1px solid #86A4C3" type="password" name="Password" placeholder="Enter Your Password" ref={(el) => { FormData.current.password = el }} />
                            </Field.Root>
                        </Stack>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                        <Button type="submit" background="#37629F" width={{ base: "100%", md: "20%" }} borderRadius="5px">Create User</Button>
                    </Stack>
                </Card.Body>
            </Card.Root>
        </form>
        <Toaster position="top-right"/>
        </>
    )
}