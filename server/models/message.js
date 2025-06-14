import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    RoomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    },
    message:{
        type:String,
        required:true
    },
    Sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Message",MessageSchema);