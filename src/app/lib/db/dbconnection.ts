import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const url = (process.env.CONNECTION_STRING)!;
const DBConnection = async() => {
    try{
        await mongoose.connect(url);
        console.log("Connection Successfull.....");
    }catch(error:any){
        console.log(error.message)
    }
}
export default DBConnection