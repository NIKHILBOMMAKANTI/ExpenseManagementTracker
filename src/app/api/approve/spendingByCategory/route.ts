import DBConnection from "@/app/lib/db/dbconnection";
import { getSpendingByCategory } from "@/app/lib/controller/ApprovalManagement";
export async function GET(request:Request){
    try{
        await DBConnection();
        const getSpendingByCategoryData = await getSpendingByCategory(request)
        return new Response(JSON.stringify(getSpendingByCategoryData), { status: getSpendingByCategoryData.status })
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({ error: message }), { status: 500 })
    }
}