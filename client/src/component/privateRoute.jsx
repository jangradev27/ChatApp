import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
 const {token}=useSelector(state=>state.Auth);
 if(!token){
    return <Navigate to={"/login"}/>;
 }
 else{
    return children;
 }
}

export default PrivateRoute