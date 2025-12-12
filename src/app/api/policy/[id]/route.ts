import { getSpecificPolicy,deletePolicy,updatePolicy } from "@/app/lib/controller/policyManagement"
import DBConnection from "@/app/lib/db/dbconnection";

export async function GET(request:Request,{params}:any){
    try{
        await DBConnection();
        const policyid = await params?.id;
        const PolicyData = await getSpecificPolicy(request,policyid);
        return new Response(JSON.stringify(PolicyData),{status:PolicyData.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}

export async function DELETE(request:Request,{params}:any){
    try{
        await DBConnection();
        const policyid = await params?.id;
        const DeletedPolicy = await deletePolicy(request,policyid);
        return new Response(JSON.stringify(DeletedPolicy),{status:DeletedPolicy.status})

    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500});
    }
}

export async function PUT(request:Request,{params}:any){
    try{
        await DBConnection();
        const policyid = await params?.id;
        const UpdatedPolicy = await updatePolicy(request,policyid);
        return new Response(JSON.stringify(UpdatedPolicy),{status:UpdatedPolicy.status})
    }catch(error:unknown){
        return new Response(JSON.stringify({error:error.message}),{status:500});
    }
}

