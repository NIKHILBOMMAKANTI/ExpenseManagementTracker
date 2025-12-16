import DBConnection from "@/app/lib/db/dbconnection";
import { RejectExpense } from "@/app/lib/controller/ApprovalManagement";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id
        const RejectedExpRes = await RejectExpense(request,expenseid);
        return NextResponse.json(JSON.stringify(RejectedExpRes),{status:RejectedExpRes.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json(JSON.stringify({error:message}),{status:500})
    }
}