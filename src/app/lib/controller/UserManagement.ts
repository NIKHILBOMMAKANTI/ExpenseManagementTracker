import User from "../models/userschema";
import { genSalt, hash } from 'bcrypt';

export const getAllUsers = async (req:Request) => {
    const payload = req.headers.get("userpayload");
    if(!payload){
        return {error:true,status:401,message:'No User Payload found in Header'}
    }
    const {id} = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if(role != 'Admin'){
        return {error:false,status:401,message:'Access Denied'}
    }
    const UserData = await User.find();
    if (!UserData || UserData.length == 0) {
        return { status: 404, message: "User Details Not Found", error: true}
    }
    
    return { status: 200, message: "User Data Fetched Successfully", data: UserData, error: false}
    

}

export const getSpecificUser = async (req:Request,userid: string) => {
    const payload = req.headers.get("userpayload");
    if(!payload){
        return {error:true,status:401,message:'No User Payload found in Header'}
    }
    const {id} = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.role
    if(role != 'Admin'){
        return {error:false,status:401,message:'Access Denied'}
    }
    
    if (!userid) {
        return { status: 400, message: "UserId is Required", error: "true" }
    }

    const SpecificUser = await User.findById({ _id: userid });
    if (!SpecificUser) {
        return { status: 404, message: "User Not Found ", error: "true" }
    }

    return { status: 200, message: "User Found", data: SpecificUser, error: "false" }


}

export const addUser = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if(!payload){
        return {error:true,status:401,message:'No User Payload found in Header'}
    }
    const {id} = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if(role !== 'Admin'){
        return {error:false,status:401,message:'Access Denied'}
    }
    const userpayload = await req.json();
    const { firstname, lastname, email, password } = userpayload
    if (!firstname || !lastname || !email || !password) {
        return { status: 400, message: "Please fill in all the required fields", error:true}
    }
    if (email) {
        const MatchedResult = await User.findOne({ email: email });
        if (MatchedResult) {
            return { status: 409, message: "User,already Exist please try Registering with another email", error:true }
        }
    }
    const Salt = await genSalt(10);
    const hashedpassword = await hash(password, Salt);

    const newuser = await new User({
        Firstname:firstname,
        Lastname:lastname,
        Email:email,
        Password: hashedpassword
    });
    newuser.save();
    return { status: 200, message: "User Created Successfully", error: true, data: newuser }
}

export const deleteUser = async(req:Request,userid:string)=>{
    const payload = req.headers.get("userpayload");
    if(!payload){
        return {error:true,status:401,message:'No User Payload found in Header'}
    }
    const {id} = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if(role != 'Admin'){
        return {error:false,status:401,message:'Access Denied'}
    }

   if(!userid){
    return {status: 400, message: "UserId is Required", error: true}
   }

   const finduser = await User.findById({_id:userid});
   if(!finduser){
    return {status:404,message: "User Does not Exist",error:true}
   }

   const deletedUser = await User.findByIdAndDelete({_id:userid});
   return {status:200,error:false,message:"User Deleted Successfully",data:deletedUser}
}


export const updateUser = async(req:Request,userid:string)=>{
    const payload = req.headers.get("userpayload");
    if(!payload){
        return {error:true,status:401,message:'No User Payload found in Header'}
    }
    const {id} = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if(role != 'Admin'){
        return {error:false,status:401,message:'Access Denied'}
    }
    const userpayload = await req.json();
    if('Password' in userpayload && !userpayload.Password){
        delete userpayload.Password;
    }
    if(!userpayload || Object.keys(userpayload).length === 0){
        return {status:400,error:true,message:"Update data is required to update the user"}
    }     
    const updatedUserData = await User.findByIdAndUpdate(userid,userpayload,{ new: true });
    return {status:200,error:false,data:updatedUserData,message:"User Updated Successfully"}
}



