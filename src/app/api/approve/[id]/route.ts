import DBConnection from "@/app/lib/db/dbconnection";
import { ApproveExpense } from "@/app/lib/controller/ApprovalManagement";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id;
        const ApproveExpRes = await ApproveExpense(request,expenseid);
        return  NextResponse.json(ApproveExpRes,{status:ApproveExpRes.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}