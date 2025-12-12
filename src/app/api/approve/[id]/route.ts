import DBConnection from "@/app/lib/db/dbconnection";
import { ApproveExpense } from "@/app/lib/controller/ApprovalManagement";


export async function POST(request:Request,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id;
        const ApproveExpRes = await ApproveExpense(request,expenseid);
        return  new Response(JSON.stringify(ApproveExpRes),{status:ApproveExpRes.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}