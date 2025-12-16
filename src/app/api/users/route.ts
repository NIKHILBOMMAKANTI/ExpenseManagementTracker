import DBConnection from "../../lib/db/dbconnection";
import { getAllUsers,addUser } from "../../lib/controller/UserManagement"
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest){
    try{
        await DBConnection();
        const UsersData = await getAllUsers(request);
        return NextResponse.json(UsersData,{status:UsersData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

export async function POST(request:Request){
    try{
        await DBConnection();
        const newUser = await addUser(request);
        return NextResponse.json(newUser,{status:newUser.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

