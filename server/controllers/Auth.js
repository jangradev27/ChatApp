import jwt from "jsonwebtoken"
import User from "../models/User.js";
import otpgenrator from "otp-generator"
import OTP from "../models/otp.js"
import bcrypt from "bcrypt"
import { config } from "dotenv";
config();

export const SendOtp=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(user){
            return res.status(403).json({
                message:"user already exist please login",
                success:false
            })
        }
        let otp=otpgenrator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            digits:true,
            specialChars:false
        })
        
        let uniqueness=await OTP.findOne({Otp:otp});
        while(uniqueness){
            otp=otpgenrator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                digits:true,
                specialChars:false
            })
            uniqueness=await OTP.findOne({Otp:otp});
        }
        const OtpPayload={email,Otp:otp};
        const Data=await OTP.create(OtpPayload);

        return res.status(200).json({
            message:"Otp Send SuccssFully",
            success:true,
        })
        
    }
    catch(err){
            console.log(err.message);
            return res.status(500).json({
                message:"internal server Error",
                success:false,
                error:err.message
            })
        }

}

export const SignUp=async(req,res)=>{
        
     try{
        const {Name,email,password,confirmPassword,Otp}=req.body;
        if(!Name || !email || !password || !Otp || !confirmPassword){
            return res.status(404).json({
                success:false,
                message:"please Enter all the fields"
            })
        }
        const user=await  User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"user Already exist",
                success:false
            })
        }
        const RecentOtp=await OTP.find({email}).sort({TimeStamp:-1}).limit(1);
        console.log(RecentOtp)
        if(RecentOtp.length===0){
                return res.status(404).json({
                    message:'Otp not found',
                    success:false
                })
        }
        else if(RecentOtp[0].Otp!==Otp){
            return res.status(402).json({
                success:false,
                message:'OTp is incorrect'
            })
        }
        const hashedpass=await bcrypt.hash(password,10);

        console.log(await bcrypt.compare(password,hashedpass));
        const NewUser=await User.create({Name,email,password:hashedpass,
            Avatar:`https://api.dicebear.com/5.x/initials/svg?seed=${Name}`});
        return res.status(200).json({
            success:true,
            message:'user created SuccessFully',
            data:NewUser
        })
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
            message:"internal server error",
            success:false,
            error:err.message
        })
    }
}

export const login=async(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"Data is missing"
        })
    }
    const user=await User.findOne({email});

    if(!user){
        return res.status(404).json({
            success:false,
            message:'user not found'
        })
    }
    
    if( !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({
            message:'password is not correct',
            success:false
        })
    }
    const payload={
        id:user._id,
        email:user.email
    }
    const token=jwt.sign(payload,process.env.jwt_Secret,{
        expiresIn:"3d"
    })
   
    user.password=undefined;
    user.token=token;
    const options = {
 
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
};
    console.log("ended")

    return res.cookie("Token",token,options).status(200).json({
        success:true,
        message:"User login ",
        data:user
    });

}



export const getUsers=async(req,res)=>{
    try{
        const user=await User.find({});
        return res.status(200).json({
            message:"user fetched",
            success:true,
            user
        })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            message:'inernal server error',
            success:false,
            error:err.message
        })
    }
}

export const getUser=async(req,res)=>{
    try{
        console.log(req.body)
        const {userid}=req.body;
        const user=await User.findById(userid);
        if(!user){
            return res.status(404).json({
                message:'User not found',
                success:false
            })
        }
        return res.status(200).json({
            message:'user found successFully',
            sucess:true,
            data:user
        })
    }
    catch(err){
        return res.status(500).json({
            message:'Internal server error',
            success:false,
            error:err.message
        })
    }
}