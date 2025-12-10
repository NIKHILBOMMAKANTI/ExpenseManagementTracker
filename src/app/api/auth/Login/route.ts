import DBConnection from "@/app/lib/db/dbconnection";
import { ValidateLogin } from "@/app/lib/controller/AuthenticationController";

export async function POST(request:Request){
    try{
        await DBConnection();
        const LoginCredentials = await ValidateLogin(request);
        return new Response(JSON.stringify({LoginCredentials}),{status:LoginCredentials?.status})
    }catch(error:any){
        return new Response(JSON.stringify({message:error.message}),{status:500})
    }
}