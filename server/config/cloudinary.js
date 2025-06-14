// import cloudinary from "cloudinary"
import  cloudinary from "cloudinary"
import { config } from "dotenv";
config()
const Cloudinary=cloudinary.v2;

const cloudinaryConnect=()=>{
    Cloudinary.config({
        cloud_name:process.env.CloudName,
        api_key:process.env.API_Key,
        api_secret:process.env.Api_Secret
    })

}

export default cloudinaryConnect;