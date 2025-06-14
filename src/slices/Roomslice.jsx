import { createSlice } from "@reduxjs/toolkit"


const initialState={
    RoomId:localStorage.getItem("CurrentRoom")?JSON.parse(localStorage.getItem("CurrentRoom")):null,
    Reciever:localStorage.getItem("CurrentReciever")?JSON.parse(localStorage.getItem("CurrentReciever")):null

}

const RoomSlice=createSlice({
    name:"Room",
    initialState,
    reducers:{
        SetRoomId(state,value){
            state.RoomId=value.payload
        },
        setUser(state,value){
            state.Reciever=value.payload;
        },
        Reset(state,value){
            state.Reciever=null;
            state.RoomId=null
            localStorage.removeItem("CurrentRoom");
            localStorage.removeItem("CurrentReciever")
        }
    }
})

export const {SetRoomId,setUser,Reset}=RoomSlice.actions;
export default RoomSlice.reducer;