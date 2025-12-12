import { SimpleGrid, Tabs, Stack } from "@chakra-ui/react"
import axios from 'axios';

export function ApprovalDashboardTabs({ setTableData,setisProcessing,setActivetab,isProcessing }: any) {
    const handleRejectedExpense = async () => {
        try{
        setTableData([]);
        const url = '/api/approve/reject';
        const Token = localStorage.getItem("Token");
        if (Token) {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            setTableData(response?.data?.data)
        }
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        console.log("Error",message)
    }finally{
         setActivetab('reject');
        setTimeout(()=>{
                setisProcessing((isProcessing:any)=>({...isProcessing, reject:false}))
            },1000)
    }
    }
    const handlePendingExpense = async () => {
        try{
        setTableData([]);
        const url = '/api/approve/pending';
        const Token = localStorage.getItem("Token");
        if (Token) {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            setTableData(response?.data?.data);
        }
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        console.log("Error",message);
    }finally{
        setActivetab('pending');
        setTimeout(()=>{
                setisProcessing((isProcessing:any)=>({...isProcessing, pending:false}))
            },1000)
    }
    }

    const handleApprovedExpense = async () => {
        try {
            setTableData([]);
            const url = '/api/approve';
            const Token = localStorage.getItem("Token");
            if (Token) {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })

                setTableData(response?.data?.data);
            }
        } catch (error: any) {
            console.log("Error", error?.message);
        } finally {
            setActivetab('approve');
            setTimeout(()=>{
                setisProcessing((isProcessing:any)=>({...isProcessing, approve:false}))
            },1000)
        }
    }


    return (

        <Stack width="95%" margin="auto" color="#D7D7D7" justifyContent="center">
            <SimpleGrid gap="80" width="full">
                <Tabs.Root variant="outline" defaultValue="Approved" style={{ borderBottom: "3px solid #D7D7D7" }} borderRadius="8px" _selected={{ bg: "#EDEDED" }}>
                    <Tabs.List>
                        <Tabs.Trigger value="Approved" lineHeight="1rem" fontWeight="700" color="#484848" fontSize={{ base: "1rem", md: "1.25rem" }} _selected={{ bg: "#EDEDED", borderTop: "3px solid #00ad45" }} onClick={() => { handleApprovedExpense() }}>
                            Approved
                        </Tabs.Trigger>
                        <Tabs.Trigger value="Rejected" lineHeight="1rem" fontWeight="700" color="#484848" fontSize={{ base: "1rem", md: "1.25rem" }} _selected={{ bg: "#EDEDED", borderTop: "3px solid #f6110e" }} onClick={() => { handleRejectedExpense() }}>
                            Rejected
                        </Tabs.Trigger>
                        <Tabs.Trigger value="Pending" lineHeight="1rem" fontWeight="700" color="#484848" fontSize={{ base: "1rem", md: "1.25rem" }} _selected={{ bg: "#EDEDED", borderTop: "3px solid #FCC02E" }} onClick={() => { handlePendingExpense() }}>
                            Pending
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </SimpleGrid>
        </Stack>

    )
}