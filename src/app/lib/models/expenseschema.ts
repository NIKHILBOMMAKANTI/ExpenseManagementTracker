import { model,models,Schema, } from "mongoose";
import User from "./userschema";
const ExpenseSchema = new Schema({
    title:{type:String,required:true},
    amount:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true,default:"Expense"},
    status:{type:String,default:"Pending"},
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User'

    },
    approverid:{
        type:Schema.Types.ObjectId,
        ref:'User'

    },
    s3key:{type:String,required:true},
    currency:{type:String,default:"INR"},
    createdAt:{type:Date,default:Date.now()},
    costCenter:{type:String,default:"HR"}
})


export default models.Expenses|| model("Expenses",ExpenseSchema)