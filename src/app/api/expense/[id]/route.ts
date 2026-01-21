import DBConnection from "@/app/lib/db/dbconnection"
import { getSpecificExpense,deleteExpense,UpdateExpense } from "@/app/lib/controller/ExpenseManagement";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext{
    params:{
        id:string
    }
}

export async function GET(request:NextRequest,{params}:any){
    try{
        console.log("params",params);
        await DBConnection();
        const {id} = await params;
        const expenseid = id;
        console.log(expenseid);
        const SpecificExpense = await getSpecificExpense(expenseid)
        console.log("SpecificExpense" , SpecificExpense);
        return NextResponse.json(SpecificExpense,{status:SpecificExpense.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

export async function DELETE(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const {id} = await params;
        const expenseid = id;
        // const expenseid = await params.id
        const DeltedExpense = await deleteExpense(request,expenseid);
        return NextResponse.json(DeltedExpense,{status:DeltedExpense.status ?? 500});
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

export async function PUT(request:NextRequest,{params}:any){
    try{
        await DBConnection();
        const {id} = await params;
        const expenseid = id;
        // const expenseid = await params.id
        const UpdatedExpenseData = await UpdateExpense(request,expenseid);
        return NextResponse.json(UpdatedExpenseData,{status:UpdatedExpenseData.status ?? 500})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return NextResponse.json({error:message},{status:500})
    }
}

