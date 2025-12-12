import DBConnection from "@/app/lib/db/dbconnection";
import { ValidateLogin } from "@/app/lib/controller/AuthenticationController";

export async function POST(request:Request){
    try{
        await DBConnection();
        const LoginCredentials = await ValidateLogin(request);
        return new Response(JSON.stringify({LoginCredentials}),{status:LoginCredentials?.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({message:message}),{status:500})
    }
}