import toast from "react-hot-toast"
import { AuthApi } from "../api"
import {apiConnector} from "../apiconnector"
import { setLoading, setToken, setUser } from "../../slices/AuthSlice"



export const Login=(data,navigate)=>{
    
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId=toast.loading("logging....");
        console.log(data)
        try{
            const response=await apiConnector("POST",AuthApi.Login_api,data);
            // console.log("Full response:", response);
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("Login successful!");

            localStorage.setItem("token",JSON.stringify(response.data.data.token));
            localStorage.setItem("User",JSON.stringify(response.data.data));
            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.data.token));
            navigate("/DashBoard")
            // Handle successful login here
            
        }
        catch(err){
            toast.error(err.response?.data?.message || err.message || "Login failed");
        }
        toast.dismiss(toastId);
    }
}

export const SignUp=(data,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId=toast.loading("Creating Account");
        try{
            const response=await apiConnector("POST",AuthApi.SignUp_api,data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Created SuccessFully,Please Login");
            navigate("/login");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const SendOtp=(data,navigate)=>{
    
    return async(dispatch)=>{
        const toastId=toast.loading("Sending Otp");
        try{
            dispatch(setLoading(true));
            const response=await apiConnector("POST",AuthApi.SendOtp_api,data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTp sent sucessFully");
            navigate("/OtpSection");

        }
        catch(err){
            toast.error(err.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export const Logout=(navigate)=>{
  return async(dispatch)=>{
      const toastId=toast.loading("loging out....");
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.clear();
    toast.success("Log out SuccessFully");
    toast.dismiss(toastId);
    navigate("/")
  }
}

export const isTokenValid=(token,navigate)=>{
return async(dispatch)=>{
    try{
        const response=await apiConnector("POST",AuthApi.TokenValid_api,null,{
            Authorization:`Bearer ${token}`
        })
        if(!response.data.success){
            dispatch(Logout(navigate));
            toast.error("Token Expired Please login again")
        }
    }
    catch(err){
        toast.error(err.response.data.message || err.message);
    }
}
}