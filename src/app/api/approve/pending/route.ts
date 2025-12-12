import DBConnection from "@/app/lib/db/dbconnection"
import { getPendingExpenses } from "@/app/lib/controller/ApprovalManagement";

export async function GET(request:Request){
    try{
        await DBConnection();
        const PendingExpenseData = await getPendingExpenses(request);
        return new Response(JSON.stringify(PendingExpenseData),{status:PendingExpenseData.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}

