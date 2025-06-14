import nodemailer from "nodemailer"
import { config } from "dotenv"
config()
 const Sendmail=async(email,title,body)=>{
   try{
     const transporter=nodemailer.createTransport({
        host:process.env.Mail_host,
        auth:{
            user:process.env.Mail_user,
            pass:process.env.Mail_pass
        }

    })

    const mail=await transporter.sendMail({
        to:email,
        from:"ChatApp-Team",
        subject:title,
        html:body
    })
    return mail;
   }

   catch(err){
    console.log("error send mail",err.message);

   }
}


export default Sendmail;