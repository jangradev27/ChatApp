import User from "../models/User.js";
import Message from "../models/message.js";
import Room from "../models/Room.js"
export const CreateRoom = async (req, res) => {
  try {
    const id1 = req.user.id;
    const {User2} = req.body;

    const user1 = await User.findById(id1);
    const user2 = await User.findById(User2);

    if (!user1 || !user2) {
      return res.status(404).json({
        success: false,
        message: 'One or both users not found' 
      });
    }

    // Check if room already exists with both participants (by their _id)
    const existingRoom = await Room.findOne({
      participant: { $all: [user1._id, user2._id] }
    }).populate("Chats");

    if (existingRoom) {
      return res.status(200).json({
        success: true,
        message: 'Room already exists',
        data: existingRoom
      });
    }

    // Create new room with participants
    const newRoom = await Room.create({
      participant: [user1._id, user2._id]
    });

    return res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: newRoom 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};


export const CreateMessage=async(roomId,message,SenderId,RecieverId)=>{
  try{
    const Sender=await User.findById(SenderId);
    const Reciever=await User.findById(RecieverId);
    const room=await Room.findById(roomId);
    if(!Sender){
      throw new Error("Sender not Found")
    }
    if(!Reciever){
      throw new Error("Reciever not Found");
    }
    if(!room){
      throw new Error("Room not found");
    }
   
    const NewMessage=await Message.create({RoomId:room._id,message:message,Sender:Sender._id,Reciever:Reciever._id});
    const UpdatedRoom = await Room.findByIdAndUpdate(roomId,{$push:{Chats:NewMessage._id}},{new:true});
    return NewMessage;
  }
  catch(Err){
    console.log(Err.message);
  }
}

