import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { Route, Routes } from 'react-router-dom';
import LoginComponent from './component/Login';
import { AuthApi } from './services/api';
import SignupPage from './component/signup';
import OtpSection from './component/OtpSection';
import Dashboard from './pages/Dashboard';
import ChatPage from './component/Chat';
import OpenRoute from './component/openRoute';
import PrivateRoute from './component/privateRoute';
import Homepage from './pages/Home';



function App() {
  

  return (
    <div className=" flex flex-col p-2 min-w-full bg-gradient-to-br from-blue-50 via-white to-purple-50  ">
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<OpenRoute><LoginComponent/></OpenRoute>}/>
          <Route path='/SignUp' element={<OpenRoute><SignupPage/></OpenRoute>}/>
          <Route path='/OtpSection' element={<OpenRoute><OtpSection/></OpenRoute>}/>

          <Route path='/Dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/Chats" element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
        </Routes>
    </div>
  );
}

export default App;
