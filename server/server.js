import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import handleSocket from './config/handleSocket.js';
import dbconnect from './config/database.js';
import Authroutes from "./routes/auth.js"
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import chatRoutes from "./routes/Room.js"
import cloudinaryConnect from './config/cloudinary.js';


const app = express();
app.use(cors({
  origin: 'https://chat-app-seven-iota-34.vercel.app',
  methods: ['GET', 'POST'],

}));


const Port=process.env.Port || 4000;
const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: 'https://chat-app-seven-iota-34.vercel.app/', // Vite client URL
    methods: ['GET', 'POST'],
   
  },
  
});

app.use(express.json());
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: "/temp/"
}))
app.use(cookieParser())
app.use("/auth",Authroutes);
app.use("/chats",chatRoutes)

handleSocket(io);

server.listen(Port, () => {
});

dbconnect();
cloudinaryConnect();