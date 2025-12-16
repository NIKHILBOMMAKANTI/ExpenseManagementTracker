import DBConnection from "@/app/lib/db/dbconnection";
import { ValidateLogin } from "@/app/lib/controller/AuthenticationController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        await DBConnection();
        const LoginCredentials = await ValidateLogin(request);
        return NextResponse.json(LoginCredentials,{status:LoginCredentials?.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong");
        return NextResponse.json({message:message},{status:500})
        
    }
}