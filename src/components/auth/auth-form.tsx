'use client'

import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, Lock, Mail, Music, User } from 'lucide-react';
import { useLogin, useRegister } from '@/hooks/use-auth';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {mutate: onRegister} = useRegister()
  const {mutate: onLogin} = useLogin()
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!isLogin) {
      if (!name) {
        newErrors.name = 'Name is required';
      } else if (name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isLogin) {
        onLogin({ email, password});
      } else {
        onRegister({ name, email, password });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r   p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl border border-purple-100 transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center justify-center mb-6">
          <Music className="text-purple-500 mr-2" size={32} />
          <h2 className="text-center text-3xl font-bold text-gray-800">
            {isLogin ? 'Harmony Hub' : 'Join the Melody'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div className="relative">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            {isLogin ? 'Tune In' : 'Compose Account'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "New to Harmony Hub? " : "Already have a rhythm? "}
            <button 
              onClick={switchAuthMode}
              className="text-purple-500 hover:underline focus:outline-none transition-colors hover:text-purple-700"
            >
              {isLogin ? 'Compose Account' : 'Tune In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;