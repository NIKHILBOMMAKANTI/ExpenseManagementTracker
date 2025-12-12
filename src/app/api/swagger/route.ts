export async function GET(){
    try{
        return new Response(JSON.stringify({message:"Swagger removed from this project."}),{status:200})
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        return new Response(JSON.stringify({error:message}),{status:500})
    }
}