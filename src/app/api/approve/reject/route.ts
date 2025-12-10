import DBConnection from "@/app/lib/db/dbconnection";
import { getRejectedExpense } from "@/app/lib/controller/ApprovalManagement";
export async function GET(request:Request){
    try{
        await DBConnection();
        const RejectedExpenses = await getRejectedExpense(request);
        return new Response(JSON.stringify(RejectedExpenses),{status:RejectedExpenses.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
} 