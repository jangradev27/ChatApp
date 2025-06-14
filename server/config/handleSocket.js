import { CreateMessage } from "../controllers/Messages.js";



const CreateMessageEntry=async(roomId,message,SenderId,RecieverId)=>{
  console.log(roomId,message,SenderId,RecieverId)
 const response= await CreateMessage(roomId,message,SenderId,RecieverId);
 return response


}

const handleSocket = (io) => { 
  io.on("connection", (socket) => {
    console.log("✅ Connected:", socket.id);

    // Handle room joining
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      // Optional: notify others in the room
      socket.to(roomId).emit("user-joined", socket.id);
    });

    // Handle message sending
    socket.on("message", async({ roomId, message,SenderId,RecieverId }) => {
      console.log(`📩 Message from ${socket.id} to room ${roomId}: ${message}`);
      const data=await CreateMessageEntry(roomId,message,SenderId,RecieverId);
      // Broadcast message to everyone else in the room
      socket.to(roomId).emit("ReceiveMessage",data);
    });

    // Handle disconnect
    socket.on("disconnect", (UserId) => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

export default handleSocket;
