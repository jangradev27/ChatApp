import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import UserCardSimple from '../component/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import { AuthApi } from '../services/api';
import { setLoading } from '../slices/AuthSlice';
import ChatAppNavbar from '../component/NavBar';
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { User, loading, token } = useSelector(state => state.Auth);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

   const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();




  const getUsers = async () => {
    dispatch(setLoading(true));
    try {

      const response = await apiConnector("GET", AuthApi.getAllUser_api);

      const data=response.data.user.filter(ele=>ele._id!==User._id)
        setUsers(data);
        setFilteredUsers(data);      
    } catch (error) {
      setUsers([]);
      setFilteredUsers([]);
    }
    dispatch(setLoading(false))
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Use correct key: check if it's `name` or `Name`
    setFilteredUsers(
      users.filter(user =>
        (user.name || user.Name || "").toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const displayedUser = search.length > 0 ? filteredUsers : users;

 useEffect(() => {
    getUsers();
  }, []);
 
  return (

    <div className="min-h-screen w-full flex   flex-col gap-5 px-4  bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ChatAppNavbar/>
      <>
        <div className="relative w-full mx-auto mb-6 max-w-3xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users"
              value={search}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>

         {loading?<div className=' min-w-full flex  justify-center items-center'>loading</div>:<>
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedUser && displayedUser.length > 0 ? (
              displayedUser.map(user => (
                <UserCardSimple user={user} key={user._id} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No users found.</p>
            )}
          </div>
          </>
         }
        </>
      
    </div>
  );
};

export default Dashboard;
