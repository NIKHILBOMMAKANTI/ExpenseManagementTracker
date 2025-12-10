import DBConnection from "../../lib/db/dbconnection";
import { getAllUsers,addUser } from "../../lib/controller/UserManagement"



export async function GET(request:Request,response:Response){
    try{
        await DBConnection();
        const UsersData = await getAllUsers(request);
        return new Response(JSON.stringify({UsersData}),{status:UsersData.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

export async function POST(request:Request){
    try{
        await DBConnection();
        const newUser = await addUser(request);
        return new Response(JSON.stringify(newUser),{status:newUser.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

