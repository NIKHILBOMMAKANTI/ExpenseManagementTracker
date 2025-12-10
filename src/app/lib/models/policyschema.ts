import { Schema,model,models } from "mongoose";
const PolicySchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true,default:"Expense"},
    limitAmount:{type:Number,required:true},
    effectiveDate:{type:Date,required:true},
    expiryDate:{type:Date,required:true},
    currency:{type:String,required:true,default:"INR"},
    createdAt:{type:Date,default:Date.now()},

})

export default models.Policies|| model("Policies",PolicySchema)