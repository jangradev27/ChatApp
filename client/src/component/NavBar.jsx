import React, { useRef, useState } from 'react';
import { Menu, X, MessageCircle, User, LogOut, LayoutDashboard, LogIn, UserPlus, MenuIcon, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import clickOutside from '../hooks/clickOutside';
import { Logout } from '../services/Operations/auth';
import toast from 'react-hot-toast';

const ChatAppNavbar = () => {
  const { token } = useSelector(state => state.Auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const[Open,setOpen]=useState(false)
  const menuref=useRef(null)
  clickOutside(menuref,()=>setOpen(false));
  const handleLogout=()=>{
    dispatch(Logout(navigate));
  }

  return (
    <nav className="bg-white w-full shadow-lg border-b border-gray-200">
      <div className="w-full mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to={"/"} className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">ChatApp</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className=" hidden md:flex items-center space-x-4">
            {/* Login and Signup buttons */}
            {
              !token && (
                <NavLink
                  to="/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-300 transition-all duration-200"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </NavLink>
              )
            }

            {
              !token && (
                <NavLink
                  to="/SignUp"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </NavLink>
              )
            }

            {/* Dashboard and Profile */}
            {
              token && (
                <NavLink
                  to="/Dashboard"
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>
              )
            }

            {
              token && (
                <div className="relative">
                  <NavLink
                    onClick={()=>toast.error("This page will be added Soon")}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium">You</span>
                  </NavLink>
                </div>
                
              )
            }
          {
              token && (
                 <button onClick={handleLogout}
                        // your logout function here
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                <span>Logout</span>
            </button>)
          }
          </div>


            <div ref={menuref} className="md:hidden relative">
                <button
                    onClick={() => setOpen(!Open)}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    <MenuIcon />
                </button>

                {Open && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-3 z-50 border border-gray-200 flex flex-col gap-2">
                    {token && (
                        <NavLink
                        to="/Dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                        <span>Dashboard</span>
                        </NavLink>
                    )}

                    {token && (
                        <NavLink onClick={()=>toast.error("page will be added soon")}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                        <User2 className="w-4 h-4" />
                        <span>You</span>
                        </NavLink>
                    )}

                    {token && (
                        <button onClick={handleLogout}
                        // your logout function here
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                        <span>Logout</span>
                        </button>
                    )}

                    {!token && (
                        <NavLink
                        to="/login"
                        className="flex items-center justify-center space-x-2 w-full text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-300 transition duration-200"
                        >
                        <span>Login</span>
                        </NavLink>
                    )}

                    {!token && (
                        <NavLink
                        to="/SignUp"
                        className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 shadow-md"
                        >
                        <span>Sign Up</span>
                        </NavLink>
                    )}
                    </div>
                )}
            </div>


        </div>
       
      </div>
    </nav>
  );
};

export default ChatAppNavbar;
