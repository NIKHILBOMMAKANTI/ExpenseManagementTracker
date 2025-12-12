import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const url = (process.env.CONNECTION_STRING)!;
const DBConnection = async() => {
    try{
        await mongoose.connect(url);
        console.log("Connection Successfull.....");
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        console.log("Error",message)
    }
}
export default DBConnection