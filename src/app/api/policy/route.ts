import {getAllpolicies,addpolicy} from '../../lib/controller/policyManagement'
import DBConnection from '../../lib/db/dbconnection';
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try{
        await DBConnection();
        const PolaciesData = await getAllpolicies(request);
        return NextResponse.json(PolaciesData,{status:PolaciesData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

export async function POST(request:NextRequest){
    try{
        await DBConnection()
        const newpolicy = await addpolicy(request);
        return NextResponse.json(newpolicy,{status:newpolicy.status ?? 500});
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500});
    }
}