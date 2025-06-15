import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { RoomApi } from "../api";
import { SetRoomId, setUser } from "../../slices/Roomslice";

export const getRoomDetails=(user2,token,navigate)=>{
    const data={
        User2:user2
    }
    return async(dispatch)=>{
        const toastId=toast.loading("Getting details")
        try{
            const response=await apiConnector("POST",RoomApi.getRoom,data,{
                Authorization:`Bearer ${token}`

            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Details fetched SuccessFully");
            localStorage.setItem("CurrentRoom",JSON.stringify(response.data.data._id));
            localStorage.setItem("CurrentReciever",JSON.stringify(user2));
            dispatch(SetRoomId(response.data.data._id));
            dispatch(setUser(user2));
            navigate("/Chats",{replace:true});
        }


        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
        toast.dismiss(toastId);
    }
}