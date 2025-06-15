import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setFormData } from '../slices/AuthSlice';
import {SendOtp, SignUp} from "../services/Operations/auth"
// Custom OTP Input Component (since react-otp-input isn't available)

const OtpSection = () => {
  const [otp, setOtp] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {formdata,loading}=useSelector(state=>state.Auth);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      ...formdata,
      Otp:otp
    };
    
    dispatch(setFormData(data));;
    dispatch(SignUp(data,navigate));

 
  };

  const resendOtp=()=>{
    dispatch(SendOtp(formdata,navigate));
  }

  useEffect(()=>{
    if(!formdata){
      navigate("/SignUp");
    }
    
  },[])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex flex-col gap-5 bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border border-gray-100">
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl text-gray-900 font-bold">
            Verify Email
          </h1>
        </div>
        <p className="text-gray-600 text-center">
          A verification code has been sent to you. Enter the code below.
        </p>
        
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                className="w-[48px] lg:w-[60px] border-2 border-gray-300 bg-white rounded-lg text-gray-900 aspect-square text-center text-xl font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none hover:border-gray-400 transition-all"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 8px",
            }}
          />
          
          <button 
            type="submit" 
            disabled={loading || otp.length !== 6}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed py-3 text-lg font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              'Verify Code'
            )}
          </button>
        </form>
        
        <div className="flex justify-between items-center pt-4">
          <NavLink to={"/login"} className="flex gap-2 text-gray-600 items-center hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <p>Back to login</p>
          </NavLink>
          
          <button 
            
            onClick={resendOtp}
            type="button" 
            className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors cursor-pointer font-medium"
          >
            <div className="flex justify-center items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Resend it
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpSection;