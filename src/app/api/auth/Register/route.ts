import {Register} from "../../../lib/controller/AuthenticationController"
import DBConnection from "../../../lib/db/dbconnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        await DBConnection();
        const Registereduser =  await Register(request);
        return  NextResponse.json(Registereduser,{status:Registereduser.status ?? 500})
    }catch(error:unknown){
         const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

