import DBConnection from "@/app/lib/db/dbconnection";
import { getDashboardSummary } from "@/app/lib/controller/ApprovalManagement";

export async function GET(request:Request){
    try{
        await DBConnection();
        const DashboardSummary = await getDashboardSummary(request);
        return new Response(JSON.stringify(DashboardSummary),{status:DashboardSummary.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}