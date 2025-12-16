import DBConnection from "@/app/lib/db/dbconnection";
import { getSpendingByCategory } from "@/app/lib/controller/ApprovalManagement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try{
        await DBConnection();
        const getSpendingByCategoryData = await getSpendingByCategory(request)
        return NextResponse.json(getSpendingByCategoryData, { status: getSpendingByCategoryData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({ error: message }, { status: 500 })
    }
}