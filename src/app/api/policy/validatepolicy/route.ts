import { ValidatePolicy } from "@/app/lib/controller/policyManagement";
import DBConnection from "@/app/lib/db/dbconnection";

export async function POST(request:Request){
    try{
        await DBConnection();
        const ValidationData = await ValidatePolicy(request);
        return new Response(JSON.stringify(ValidationData),{status:ValidationData.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}