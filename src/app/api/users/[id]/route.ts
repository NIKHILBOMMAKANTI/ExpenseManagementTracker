import DBConnection from "@/app/lib/db/dbconnection";
import { getSpecificUser,deleteUser,updateUser } from "@/app/lib/controller/UserManagement";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id;
        if(!userid){
            return NextResponse.json({error:true,status:400,message:"User ID is required."})
        }
        const SpecificUserData = await getSpecificUser(request,userid);
        return NextResponse.json({SpecificUserData},{status:SpecificUserData.status ?? 500})

    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error: message},{status:500})
    }
}

export async function DELETE(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id
        if(!userid){
            return NextResponse.json({error:true,status:400,message:"User ID is required."});
        }
        const deletedUser = await deleteUser(request,userid);
        return NextResponse.json(JSON.stringify({deletedUser}),{status:deletedUser.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json(JSON.stringify({error:message}),{status:500})
    }
}

export async function PUT(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const userid = await params.id
        const updatedUserData = await updateUser(request,userid);
        return NextResponse.json({updatedUserData},{status:updatedUserData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}