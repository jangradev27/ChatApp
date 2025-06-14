import mongoose  from "mongoose";
import { config } from "dotenv";
config();
const dbconnect=()=>{
    mongoose.connect(process.env.Database_url).then(()=>console.log("database connect")).catch(err=>console.log(err.message));

}


export default dbconnect;