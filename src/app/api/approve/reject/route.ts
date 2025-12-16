import DBConnection from "@/app/lib/db/dbconnection";
import { getRejectedExpense } from "@/app/lib/controller/ApprovalManagement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try{
        await DBConnection();
        const RejectedExpenses = await getRejectedExpense(request);
        return NextResponse.json(RejectedExpenses,{status:RejectedExpenses.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
} 