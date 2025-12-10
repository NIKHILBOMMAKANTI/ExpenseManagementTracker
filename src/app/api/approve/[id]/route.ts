import DBConnection from "@/app/lib/db/dbconnection";
import { ApproveExpense } from "@/app/lib/controller/ApprovalManagement";


export async function POST(request:Request,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id;
        const ApproveExpRes = await ApproveExpense(request,expenseid);
        return  new Response(JSON.stringify(ApproveExpRes),{status:ApproveExpRes.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}