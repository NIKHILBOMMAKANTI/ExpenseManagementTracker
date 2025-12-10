import {hash,genSalt} from 'bcrypt';
import User from "../models/userschema";
import { compare } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import {sign} from 'jsonwebtoken';
export const Register =  async(req:Request)=>{
    const body = await req.json();
    const {firstname,lastname,email,password} = body
        if(!firstname || !lastname ||!email ||!password){
            return {status:400,message:"Please fill in all the required fields",error:true}

        }
        
        if(email){
            const MatchedResult = await User.findOne({Email:email});
            if(MatchedResult){
                return {status:409,message:"User,already Exist please try Registering with another email",error:"true"}
            }

        }
        const Salt = await genSalt(10);
        const hashedpassword = await hash(password,Salt);
        const newuser =  new User({
        Firstname:firstname,
        Lastname:lastname,
        Email:email,
        Password:hashedpassword
    })
    await newuser.save();
    return {status:200,message:"Registration Successfull",userdata:newuser,error:"false"};
}


export const ValidateLogin = async(request:Request)=>{
    const loginpayload = await request.json();
    const {email,password} = loginpayload
    if(!email || !password){
        return {status:400,message:"Email and Password Required",error:true}
    }
    const  userdetails = await User.findOne({Email:email});
    if(userdetails){
        const hashedpassword = userdetails.Password
        const isValid = await compare(password,hashedpassword);
        if(!isValid){
            return { error: true, message: "Incorrect password. Please try again.", status: 401 };
        }
        
        const userid = userdetails._id.toString();
        const secretkey = process.env.SECRET_KEY
        const token = sign({id:userid},`${secretkey}`,{expiresIn:'6h'});
        if(!token){
            return {status:500,message:"Something went wrong. Please try again.",error:true}
        }
        return {error:false,message:"Login Successfull",Token:token,status:200,role:userdetails?.Role}

        
    }else{
        return {error:true,message:"User not found. Please register before logging in",status:401}
    }
    
}