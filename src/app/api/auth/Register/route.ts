import {Register} from "../../../lib/controller/AuthenticationController"
import DBConnection from "../../../lib/db/dbconnection";


export async function POST(request:Request,response:Response){
    try{
        await DBConnection();
        const Registereduser =  await Register(request);
        return new Response(JSON.stringify({Registereduser}),{status:Registereduser.status})
    }catch(error:unknown){
         const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}

