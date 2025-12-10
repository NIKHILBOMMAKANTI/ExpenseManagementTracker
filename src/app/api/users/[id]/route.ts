import DBConnection from "@/app/lib/db/dbconnection";
import { getSpecificUser,deleteUser,updateUser } from "@/app/lib/controller/UserManagement";


export async function GET(request:Request,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id;
        if(!userid){
            return {error:true,status:400,message:"User ID is required."}
        }
        const SpecificUserData = await getSpecificUser(request,userid);
        return new Response(JSON.stringify({SpecificUserData}),{status:SpecificUserData.status})

    }catch(error:any){
    return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

export async function DELETE(request:Request,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id
        if(!userid){
            return {error:true,status:400,message:"User ID is required."}
        }
        const deletedUser = await deleteUser(request,userid);
        return new Response(JSON.stringify({deletedUser}),{status:deletedUser.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

export async function PUT(request:Request,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id
        const updatedUserData = await updateUser(request,userid);
        return new Response(JSON.stringify({updatedUserData}),{status:updatedUserData.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}