import cloudinary from "cloudinary";
const Cloudinary=cloudinary.v2
const Uplaodfile=async(file,folder,quality,height)=>{
    try{
     const options={folder,resource_type:"auto"};
    if(height){
        options.height=height;
    }
    if(quality){
        options.quality=quality;
    }
    console.log("tempfile path",file.tempFilePath)
    return await Cloudinary.uploader.upload(file.tempFilePath, options);
    }
    catch(err){
        console.log(err.message)
    }
}


export default Uplaodfile