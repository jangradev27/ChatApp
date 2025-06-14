import mongoose from "mongoose";

const RoomSchema=new mongoose.Schema({
    participant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    Chats:[{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message" 
    }]
})

export default mongoose.model("Room",RoomSchema);