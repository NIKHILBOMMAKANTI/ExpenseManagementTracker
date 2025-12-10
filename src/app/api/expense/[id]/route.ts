import DBConnection from "@/app/lib/db/dbconnection"
import { getSpecificExpense,deleteExpense,UpdateExpense } from "@/app/lib/controller/ExpenseManagement";
export async function GET(request:Request,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id
        const SpecificExpense = await getSpecificExpense(expenseid)
        return new Response(JSON.stringify(SpecificExpense),{status:SpecificExpense.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

export async function DELETE(request:Request,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id
        const DeltedExpense = await deleteExpense(request,expenseid);
        return new Response(JSON.stringify(DeltedExpense),{status:DeltedExpense.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

export async function PUT(request:Request,{params}:any){
    try{
        await DBConnection();
        const expenseid = await params.id
        const UpdatedExpenseData = await UpdateExpense(request,expenseid);
        return new Response(JSON.stringify(UpdatedExpenseData),{status:UpdatedExpenseData.status})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

