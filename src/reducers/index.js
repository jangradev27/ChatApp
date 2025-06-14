import { combineReducers } from "redux";
import authslice from "../slices/AuthSlice"
import RoomSlice from "../slices/Roomslice"
const RootReducer=combineReducers({
    Auth:authslice,
    Room:RoomSlice
})

export default RootReducer;
