import DBConnection from "../../lib/db/dbconnection"
import { getApprovedExpenses } from "../../lib/controller/ApprovalManagement"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try{
        await DBConnection();
        const ApprovedExpRes = await getApprovedExpenses(request);
        return NextResponse.json(ApprovedExpRes,{status:ApprovedExpRes.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}