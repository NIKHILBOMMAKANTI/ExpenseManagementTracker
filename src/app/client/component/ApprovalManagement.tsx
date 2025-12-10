import { Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApprovalDashboard } from './ApprovalDashboard';
import { ApprovalDashboardTabs } from "./ApprovalDashboardTabs";
import { ApprovalTable } from './ApprovalTable';
export function ApprovalManagement() {
    const [dashboarddata, setDashboardData] = useState();
    const [tabledata, setTableData] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [activeTab,setActivetab] = useState('approve');
    const [isProcessing,setisProcessing] = useState({
        approve:true,
        pending:true,
        reject:true
    });

    useEffect(() => {
        const GetData = async () => {
            try {
                const url = '/api/approve/DashboardSummary'
                const Token = localStorage.getItem("Token");
                if (Token) {
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${Token}`
                        }
                    });
                    setDashboardData(response?.data?.data)
                }
            } catch (error: any) {
                console.log("Error", error?.message);
            } finally {
                setTimeout(()=>{
                    setIsLoading(false);
                },1000)
                
            }
        }
        GetData();
    }, []);
    useEffect(() => {
        const GetData = async () => {
            try{
            const url = '/api/approve'
            const Token = localStorage.getItem("Token");
            if (Token) {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
                setTableData(response?.data?.data);
            }
        }catch(error){
            console.log("Error",error);
        }finally{
            setActivetab('approve');
            setTimeout(()=>{
                setisProcessing((isProcessing)=>({...isProcessing, approve:false}))
            },1000)
            
        }
        }
        GetData();
    }, [])
    return (
        <>
            <Stack background="#EDEDED" padding="0.4rem">
                <Text color="#878787">Home/Approval Mangement</Text>
            </Stack>
            <ApprovalDashboard data={dashboarddata}  isLoading={isLoading}/>
            <ApprovalDashboardTabs setTableData={setTableData} setisProcessing={setisProcessing} setActivetab={setActivetab} isProcessing={isProcessing}/>
            <ApprovalTable tabledata={tabledata} isProcessing={isProcessing} activeTab={activeTab} />
        </>
    )
}
