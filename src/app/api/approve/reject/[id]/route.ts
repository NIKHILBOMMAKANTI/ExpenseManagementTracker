import DBConnection from "@/app/lib/db/dbconnection";
import { RejectExpense } from "@/app/lib/controller/ApprovalManagement";
export async function POST(request:Request,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id
        const RejectedExpRes = await RejectExpense(request,expenseid);
        return new Response(JSON.stringify(RejectedExpRes),{status:RejectedExpRes.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}