import User from "../models/User.js"
import { config } from "dotenv"
import Uplaodfile from "../utils/uploadFile.js";
export const UpdateProfile=async(req,res)=>{

    try{
        const id=req.user.id;
        const ProfilePic=req.files.picture;
        if(!ProfilePic){
            return res.status(404).json({
                message:"please enter all fields",
                success:false
            })
        }

        const avatar=await Uplaodfile(ProfilePic,process.env.FolderName);
    
        const user=await User.findByIdAndUpdate(id,{Avatar:avatar.secure_url},{new:true});
        return res.status(200).json({
            message:"Avatar Updated SuccessFully",
            success:true,
            data:user

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


