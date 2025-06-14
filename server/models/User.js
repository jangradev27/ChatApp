import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    GoogleId:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    Avatar:{
        type:String
    },

    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    resePassTime:{
        type:Date,
       
    }
})

export default mongoose.model("User",UserSchema);