'use client'
import { useContext,useState } from "react";
// import { DashboardOverview } from "./DashboardOverview";
// import { ExpenseOverview } from "./ExpenseOverview";
// import { ExpenseManagement } from "./ExpenseManagement";
// import { ApprovalManagement } from "./ApprovalManagement";
// import { PolicyManagement } from "./PolicyManagement";
// import { UserManagement } from "./UserManagement";
// import { UserCreation } from "./UserCreation";
// import { ExpenseCreation } from "./ExpenseCreation";
// import { PolicyCreation } from "./PolicyCreation";
import { Flex, Box, Text, Stack, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PageContext } from "../context/PageProvider";
import Swal from "sweetalert2";




export function AdminContent() {
    const route = useRouter(); 
    const {page, setPage} = useContext(PageContext)!;
    // const [expid,setExpid] = useState<number>(0);
    // const renderPage = () => {
    //     switch (page) {
    //         case 'dashboard':
    //             return <DashboardOverview />
    //         case 'approval':
    //             return <ApprovalManagement />
    //         case 'expense':
    //             return <ExpenseManagement setExpid={setExpid}/>
    //         case 'policy':
    //             return <PolicyManagement />
    //         case 'user':
    //             return <UserManagement />
    //         case 'usercreation':
    //             return <UserCreation/>
    //         case 'expensecreation':
    //             return <ExpenseCreation/>
    //         case 'policycreation':
    //             return <PolicyCreation/>
    //         case 'expenseoverview':
    //             return <ExpenseOverview heading="Expense Mangement" buttontxt="Add Expense" expid={expid}/>
    //         default: 
    //             return <DashboardOverview />
    //     }
    // }
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
        {/* <Flex flexDirection="row" justifyContent="center" minHeight="100vh">
            <Box flex="2" display={{ base: "none", sm: "block" }} background="#C3E0F8"   > */}
                <Stack direction="row" alignItems="center" gap="4" padding="0.8rem" borderBottom="1px solid #8BB5E3" cursor="pointer" background={(page === 'dashboard')?('#ffffff'):('#C3E0F8')} onClick={() => { setPage("dashboard"); route.push('/client/pages/admindashboard') }}>
                    <Box >
                        <Image width="34px" height="34px" src="/Dashboard.png" />
                    </Box>
                    <Box>
                        <Text color="#265C94">Dashboard</Text>
                    </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="4" padding="0.6rem" borderBottom="1px solid #8BB5E3" cursor="pointer" background={(page === 'expense' || page === 'expenseoverview' || page === 'expensecreation')?('#ffffff'):('#C3E0F8')} onClick={() => { setPage("expense"); route.push('/client/pages/admindashboard/expense')}}>
                    <Box>
                        <Image width="34px" height="34px" src="/Expense.png" />
                    </Box>
                    <Box>
                        <Text color="#265C94">Expense Management</Text>
                    </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="4" padding="0.6rem" borderBottom="1px solid #8BB5E3" cursor="pointer" background={(page === 'user' || page === 'usercreation')?('#ffffff'):('#C3E0F8')} onClick={() => { setPage("user"); route.push('/client/pages/admindashboard/user') }}>
                    <Box>
                        <Image width="34px" height="34px" src="/User.png" />
                    </Box>
                    <Box>
                        <Text color="#265C94">User Management</Text>
                    </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="4" padding="0.6rem" borderBottom="1px solid #8BB5E3" cursor="pointer" background={(page === 'policy' || page == 'policycreation')?('#ffffff'):('#C3E0F8')} onClick={() => { setPage("policy"); route.push('/client/pages/admindashboard/policy') }}>
                    <Box>
                        <Image width="34px" height="34px" src="/Policy.png" />
                    </Box>
                    <Box>
                        <Text color="#265C94">Policy Management</Text>
                    </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="4" padding="0.6rem" borderBottom="1px solid #8BB5E3" cursor="pointer" background={(page === 'approval' || page === 'approvalcreation')?('#ffffff'):('#C3E0F8')} onClick={() => { setPage("approval"); route.push('/client/pages/admindashboard/approval')}}>
                    <Box>
                        <Image width="34px" height="34px" src="/Approval.png" />
                    </Box>
                    <Box>
                        <Text color="#265C94">Approval Management</Text>
                    </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="4" padding="0.6rem" borderBottom="1px solid #8BB5E3" cursor="pointer" onClick={(e)=>{e.currentTarget.style.background = '#ffffff'; handleLogout()}}>
                    <Box>
                        <Image width="34px" height="34px" src="/Logout.png" />
                    </Box>
                    <Box>
                        <Text color="#265C94">Logout</Text>
                    </Box>
                </Stack>
            {/* // </Box>
            // <Box flex="8">
            //     <Stack gap="4">
            //         {
            //             renderPage()
            //         }
            //     </Stack>
            // </Box>
        //</Flex> */}
        </>
    )

}