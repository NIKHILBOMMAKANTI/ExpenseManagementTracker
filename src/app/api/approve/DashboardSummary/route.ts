import DBConnection from "@/app/lib/db/dbconnection";
import { getDashboardSummary } from "@/app/lib/controller/ApprovalManagement";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try{
        await DBConnection();
        const DashboardSummary = await getDashboardSummary(request);
        return NextResponse.json(DashboardSummary,{status:DashboardSummary.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}