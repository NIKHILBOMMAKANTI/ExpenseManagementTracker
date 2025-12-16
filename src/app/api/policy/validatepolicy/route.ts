import { ValidatePolicy } from "@/app/lib/controller/policyManagement";
import DBConnection from "@/app/lib/db/dbconnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        await DBConnection();
        const ValidationData = await ValidatePolicy(request);
        return NextResponse.json(ValidationData,{status:ValidationData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}