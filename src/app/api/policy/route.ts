import {getAllpolicies,addpolicy} from '../../lib/controller/policyManagement'
import DBConnection from '../../lib/db/dbconnection';
export async function GET(request:Request){
    try{
        await DBConnection();
        const PolaciesData = await getAllpolicies(request);
        return new Response(JSON.stringify(PolaciesData),{status:PolaciesData.status})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}

export async function POST(request:Request){
    try{
        await DBConnection()
        const newpolicy = await addpolicy(request);
        return new Response(JSON.stringify(newpolicy),{status:newpolicy.status});
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500});
    }
}