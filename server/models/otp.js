import mongoose from "mongoose";
import Sendmail from "../utils/mail.js";
import otpTemplate from "../templates/otpemail.js";

const otpSchema=new mongoose.Schema({
    Otp:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true
    },
    TimeStamp:{
        type:Date,
        default:Date.now,
        expires:5*60
    }
})
const SendOtpMail=async(email,Otp)=>{
    try{
        const Data=await Sendmail(email,"Verification Mail",otpTemplate(Otp));
        console.log(Data);
    }
    catch(err){
        return res.json({
            message:"Error At sending OTp Mail",
            Error:err.message
        })
    }    
}

otpSchema.pre("save",async function(next){
    console.log(this.email,this.otp);
    await SendOtpMail(this.email,this.Otp);
    next();
})

export default mongoose.model("OTP",otpSchema)