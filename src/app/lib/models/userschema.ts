import mongoose,{Schema,model,models} from "mongoose";
const UserSchema = new Schema({
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    Role:{type:String,enum:["Admin","User"],default:"User"}
});
//     if (models.User) {
//   delete models.User;
// }
export default  models.User||model("User",UserSchema);