import { getSpecificPolicy,deletePolicy,updatePolicy } from "@/app/lib/controller/policyManagement"
import DBConnection from "@/app/lib/db/dbconnection";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const policyid = await params?.id;
        const PolicyData = await getSpecificPolicy(request,policyid);
        return NextResponse.json(PolicyData,{status:PolicyData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500});
    }
}

export async function DELETE(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const policyid = await params?.id;
        const DeletedPolicy = await deletePolicy(request,policyid);
        return NextResponse.json(DeletedPolicy,{status:DeletedPolicy.status ?? 500})

    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json(JSON.stringify({error:message}),{status:500});
    }
}

export async function PUT(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const policyid = await params?.id;
        const UpdatedPolicy = await updatePolicy(request,policyid);
        return NextResponse.json(UpdatedPolicy,{status:UpdatedPolicy.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500});
    }
}

