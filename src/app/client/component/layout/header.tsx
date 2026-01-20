'use client'
import { Box, Flex, Image, Drawer, Portal, VStack, Text, Stack } from '@chakra-ui/react'
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { useState,useContext } from 'react';
import { PageContext } from "../../context/PageProvider";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export function Header() {
    const [open, setOpen] = useState(false)
    const {page, setPage} = useContext(PageContext)!;
    const route = useRouter();
    const handleLogout = async () => {
            await localStorage.removeItem("Token");
            Swal.fire({
                title: "Logout Successfull!",
                confirmButtonColor:"#39619F",
                icon: "success"
            }).then((result)=>{
                if(result.isConfirmed){
                    route.push("/client/pages/login")
                }
            });
    
        }
    return (
        <>
            <Box background="linear-gradient(90deg, #629BD9 0%, #C6D8EC 100%)" >
                <Flex alignItems="center" justifyContent="space-between">
                    <Box>
                        <Image width="171px" height="39px" margin="0.3rem" src="/Logo.png" m="10px 15px" />
                    </Box>
                    <Box margin="1rem" display={{base:"block",md:"none"}}>
                        <FaBars color='#39619F' size="34px" onClick={()=>{setOpen(true)}} />
                    </Box>
                    <Box  alignItems="center" gap="2" marginRight="1rem" display={{base:"none",sm:"flex"}} >
                        <CgProfile color='#39619F' size="24px"/>
                        <Text color="#265C94">Nikhil Bommakanti</Text>
                    </Box>
                </Flex>
            </Box>
            <Drawer.Root open={open} size="xs" placement="start" >
                <Portal>
                    <Drawer.Positioner padding="4">
                        <Drawer.Content bg="#C3E0F8">
                            <Box  display="flex" justifyContent="flex-end" marginTop="0.5rem" marginRight="0.5rem" color="#39619F">
                                <ImCross onClick={()=>{setOpen(false)}}/>
                            </Box>
                            <Drawer.Header>
                                <Drawer.Title color="#39619F">Admin Panel</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Stack direction="row" alignItems="center" marginBottom="0.5rem" gap="4">
                                    <Box>
                                        <Image width="34px" height="34px" src="/Dashboard.png" />
                                    </Box>
                                    <Box onClick={()=>{setPage('dashboard'); setOpen(false)}}>
                                        <Text color="#265C94">Dashboard</Text>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" marginBottom="0.5rem" gap="4">
                                    <Box>
                                        <Image width="34px" height="34px" src="/Expense.png" />
                                    </Box>
                                    <Box onClick={()=>{setPage('expense'); setOpen(false)}}>
                                        <Text color="#265C94">Expense Management</Text>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" marginBottom="0.5rem" gap="4">
                                    <Box>
                                        <Image width="34px" height="34px" src="/User.png" />
                                    </Box>
                                    <Box onClick={()=>{setPage('user'); setOpen(false)}}>
                                        <Text color="#265C94">User Management</Text>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" marginBottom="0.5rem" gap="4">
                                    <Box>
                                        <Image width="34px" height="34px" src="/Policy.png" />
                                    </Box>
                                    <Box onClick={()=>{setPage('policy'); setOpen(false)}}>
                                        <Text color="#265C94">Policy Management</Text>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" marginBottom="0.5rem" gap="4">
                                    <Box>
                                        <Image width="34px" height="34px" src="/Approval.png" />
                                    </Box>
                                    <Box onClick={()=>{setPage('approval'); setOpen(false)}}>
                                        <Text color="#265C94">Approval Management</Text>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" marginBottom="0.5rem" gap="4">
                                    <Box onClick={()=>{handleLogout()}}>
                                        <Image width="34px" height="34px" src="/Logout.png" />
                                    </Box>
                                    <Box>
                                        <Text color="#265C94">Logout</Text>
                                    </Box>
                                </Stack>
                            </Drawer.Body>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </>
    )
}
