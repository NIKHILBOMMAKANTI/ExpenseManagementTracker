import DBConnection from "@/app/lib/db/dbconnection";
import { getDashboardSummary } from "@/app/lib/controller/ApprovalManagement";

export async function GET(request:Request){
    try{
        await DBConnection();
        const DashboardSummary = await getDashboardSummary(request);
        return new Response(JSON.stringify(DashboardSummary),{status:DashboardSummary.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}