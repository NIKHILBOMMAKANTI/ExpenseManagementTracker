import { useEffect, useState,useRef,useContext } from "react";
import { PageContext } from "../context/PageProvider";
import { UserTable } from "./UserTable";
import axios from 'axios'
// import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';


interface FormType {
    firstname?: HTMLInputElement | null,
    lastname?: HTMLInputElement | null,
    email?: HTMLInputElement | null,
    password?: HTMLInputElement | null
}

export function UserManagement() {
    const [data, setData] = useState<any[]>([]);
    const [delUser, setDelUser] = useState([]);
    const [userUpdate,setUserUpdate] = useState(false);
   const [isLoading, setIsLoading] = useState(true);



 const GetData = async () => {
            try{
            const url = "/api/users";
            const Token = localStorage.getItem("Token")
            if (Token) {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                console.log("FULL RESPONSE:", response?.data?.data);
                setData(response?.data?.data);
            }
        }catch(error:unknown){
            const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
            console.log("Error",message)
        }finally{
            setIsLoading(false);
        }
        }
    const handleUserDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const button = e.currentTarget
            const userid = button.dataset.userid
            const url = `/api/users/${userid}`
            const Token = localStorage.getItem("Token");
            if (Token) {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });
                const responsepayload = response?.data?.deletedUser
                toast.success(`${responsepayload?.message}`, {
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
                await GetData()
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
            console.log("Error", Error);
        }
    }
    useEffect(() => {
        GetData();
    }, [delUser,userUpdate])
    return (
        <UserTable data={data} handleUserDelete={handleUserDelete}  setUserUpdate={setUserUpdate}  heading="User Management" buttontxt="Add User" isLoading={isLoading} GetData={GetData}/>
    )
}