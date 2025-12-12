import DBConnection from "../../../lib/db/dbconnection";
import { sendNotification } from "../../../lib/controller/Notification Management";
export async function POST(request:Request,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id;
        const sendMailRes = await sendNotification(userid);
        return new Response(JSON.stringify(sendMailRes),{status:sendMailRes?.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}