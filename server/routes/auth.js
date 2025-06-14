import { getUser, getUsers, login, SignUp } from "../controllers/Auth.js";
import express from "express"
import { SendOtp } from "../controllers/Auth.js";
import { Islogin } from "../middleware/auth.js";
const router =express.Router();

router.post("/Signup",SignUp);
router.post("/login",login)
router.post("/isAuth",Islogin)
router.post("/SendOtp",SendOtp);
router.get("/getUsers",getUsers)
router.post("/getUser",getUser);

export default router; 