import DBConnection from "@/app/lib/db/dbconnection";
import { getRejectedExpense } from "@/app/lib/controller/ApprovalManagement";
export async function GET(request:Request){
    try{
        await DBConnection();
        const RejectedExpenses = await getRejectedExpense(request);
        return new Response(JSON.stringify(RejectedExpenses),{status:RejectedExpenses.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
} 