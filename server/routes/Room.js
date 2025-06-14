import express from "express";
import { Islogin } from "../middleware/auth.js";
import { CreateRoom } from "../controllers/Messages.js";

const router=express.Router();

router.post("/getRoom",Islogin,CreateRoom);

export default router; 