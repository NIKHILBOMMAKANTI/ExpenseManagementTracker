import { swaggerSpec } from "../../../../../swagger";

export async function GET(){
    try{
        return new Response(JSON.stringify(swaggerSpec),{status:200})
    }catch(error:any){
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}