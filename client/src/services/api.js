const baseURL=import.meta.env.VITE_API_URL

export const AuthApi={
    Login_api:`${baseURL}/auth/login`,
    SignUp_api:`${baseURL}/auth/SignUp`,
    SendOtp_api:`${baseURL}/auth/SendOtp`,
    getAllUser_api:`${baseURL}/auth/getUsers`,
    getUser_api:`${baseURL}/auth/getUser`,
    TokenValid_api:`${baseURL}/auth/validToken`
}

export const RoomApi={
    getRoom:`${baseURL}/chats/getRoom`
}