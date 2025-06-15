import React from "react";
import {
  Mail,

  MessageSquare,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoomDetails } from "../services/Operations/Room";

// Optional: Color role badge based on user role


const UserCardSimple = ({user}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {token}=useSelector(state=>state.Auth);


  const CreateRoom=()=>{
    dispatch(getRoomDetails(user._id,token,navigate));
  }



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.Avatar}
          alt={user.Name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{user.Name}</h3>
          
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="truncate">{user.email}</span>
        </div>
        
        
      </div>

      {/* Message Button */}
      <div className="flex justify-end">
        <button 
          onClick={CreateRoom}
          className="flex md:w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
      </div>
    </div>
  );
};

export default UserCardSimple;
