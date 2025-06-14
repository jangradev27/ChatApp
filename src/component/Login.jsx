import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Login } from '../services/Operations/auth';
import { useDispatch } from 'react-redux';
import ChatAppNavbar from './NavBar';

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  // Basic usage without formState
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(Login(data,navigate));
  };

  return (
    <div className="min-h-screen flex flex-col gap-10  items-center justify-center  bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <ChatAppNavbar/>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-center space-x-2 text-white">
            <LogIn size={24} />
            <h2 className="text-2xl font-bold">Welcome Back</h2>
          </div>
          <p className="text-blue-100 text-center mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 ml-3 mt-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 ml-3 mt-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <NavLink to="/SignUp" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
