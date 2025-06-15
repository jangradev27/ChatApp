import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const OpenRoute = ({children}) => {
 const {token}=useSelector(state=>state.Auth);
   
    if (token ===null)
        return children;
    else 
         return <Navigate to={"/Dashboard"}/>

}

export default OpenRoute