"use client"
import React, { useState } from 'react'
import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/lib/redux/slices/userSlice';
import { useRouter } from 'next/navigation';


function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();


    const handleLogin = async (e) => {
        e.preventDefault();
        if(email.trim()==''){
            setError('Enter your username');
            return;
        }
        if(password.trim()==''){
            setError('Enter your password');
            return;
        }
        try{
            await signInWithEmailAndPassword(auth,email,password);
            router.push('/homepage');
        }catch(err){
            setError(err.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-sky-100 font-sans">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="mt-2 text-gray-500">Log in to continue to the chat</p>
                </div>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            type="email"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-xs text-center text-gray-400">
                    Don't have an account? <a href="./signup" className="text-indigo-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};


export default page
