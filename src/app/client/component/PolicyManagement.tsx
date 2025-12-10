import { useEffect, useState, useContext } from "react"
import { PolicyTable } from "./PolicyTable";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { PageContext } from "../context/PageProvider";


export function PolicyManagement() {
    const [data, setData] = useState();
    const { page, setPage } = useContext(PageContext)!;
    const [delpolicy, setDelPolicy] = useState();
    const [isLoading, setIsLoading] = useState(true);



    const GetData = async () => {
            try {
                const url = '/api/policy'
                const Token = localStorage.getItem("Token");
                if (Token) {
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${Token}`
                        }
                    })
                    setData(response?.data?.data)
                }
            } catch (error: any) {
                console.log("Errror", error?.message);
            } finally {
                setTimeout(()=>{setIsLoading(false);},1000)
                
            }

        }
    useEffect(() => {
        
        GetData();
    }, [delpolicy])
        const handlePolicyDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const button = e.currentTarget;
            const policyid = button.dataset.policyid;
            const Token = localStorage.getItem("Token");
            if (Token) {
                const url = `/api/policy/${policyid}`;
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                const responsepayload = response?.data;
                toast.success(`${responsepayload.message}`, {
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

                await GetData();
                setTimeout(() => setPage('policy'), 2000);

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
        <PolicyTable data={data} handlePolicyDelete={handlePolicyDelete} heading="Policy Management" buttontxt="Add Policy" isLoading={isLoading} GetData={GetData}/>
    )
}