import { createSlice } from "@reduxjs/toolkit"


const initialState={
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
    User:localStorage.getItem("User")? JSON.parse(localStorage.getItem("User")):null,
    loading:false,
    formdata:null
    
    
}


const AuthSlice=createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setLoading(state,value){
            state.loading=value.payload;
        },
        setFormData(state,value){
            state.formdata=value.payload
        },
        setToken(state,value){
            state.token=value.payload
        },
        setUser(state,value){
            state.User=value.payload
        }
    }
})

export const {setToken,setLoading,setUser,setFormData}=AuthSlice.actions;

export default AuthSlice.reducer;