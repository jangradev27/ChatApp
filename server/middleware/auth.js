import jwt from "jsonwebtoken"
import { config } from "dotenv";

config();
export const Islogin=async(req,res,next)=>{
    try{
        const token =req.cookies.Token || req.header("Authorization").replace("Bearer ", "") ;
        if(!token){
            return res.status(404).json({
                success:false,
                message:"token is missing"
            }) 
        }
        // verify the token
        try{
            const decode= jwt.verify(token,process.env.jwt_Secret);
            req.user=decode; 
            
        }
        catch(err){
           return res.status(401).json({ 
              success:false,
              message:"Token is invalid,Please try after login again"  
            })
        }
        next();
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
   
}


