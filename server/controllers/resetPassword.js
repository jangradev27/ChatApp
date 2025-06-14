import User from "../models/User.js";
import Sendmail from "../utils/mail.js";

export const ResetToken=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        const token=crypto.randomUUID();
        const url=`http://localhost:3000/${token}`;
        const newData=await User.findOneAndUpdate({email},{token:token,resePassTime:Date.now()+5*60*1000},{new:true});
        const mail=await Sendmail(email,"Reset Password Link",`Your reset password link which is valid for 5min: ${url}`)
        return res.status(200).json({
            message:'Link send SuccessFully',
            success:true
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'internal server error',
            error:err.message
        })
    }
}


exports.ResetPassword=async(req,res)=>{
    try{
        const {password,ConfirmPass,token}=req.body;
    
        if(password!==ConfirmPass){
            return res.json({
                success:false,
                message:"password not matching"
            })
        }
        const user=await User.findOne({token});
        if(!user){
            return res.status(404).json({
                success:false, 
                message:"Token is invalid"
            })
        }
        if(user.resePassTime < Date.now()){
            return res.status(403).json({
                success:false,
                message:"Token expires"
            })
        }
        
        const hashedPass= await bcrypt.hash(ConfirmPass,10);
        await User.findOneAndUpdate({token},{password:hashedPass},{new:true})
        
        await Sendmail(user.email,"Password Change","Your password has been changed");
        return res.status(200).json({
            success:true,
            message:"password changed successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error at reset Password",
            error:err.message
            
        })
    }
}