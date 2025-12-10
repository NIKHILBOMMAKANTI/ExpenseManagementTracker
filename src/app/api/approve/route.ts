import DBConnection from "../../lib/db/dbconnection"
import { getApprovedExpenses } from "../../lib/controller/ApprovalManagement"

export async function GET(request:Request){
    try{
        await DBConnection();
        const ApprovedExpRes = await getApprovedExpenses(request);
        return new Response(JSON.stringify(ApprovedExpRes),{status:ApprovedExpRes.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}