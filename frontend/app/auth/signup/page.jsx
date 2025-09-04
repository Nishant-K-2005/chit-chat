"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return; // Stop the execution if they don't match
        }

        try{
            await createUserWithEmailAndPassword(auth,email,password);
            router.push('/homepage');
        }catch(err){
            let friendlyError = "Failed to sign up, please try again"
            if(err.code === "auth/email-alredy-in-use"){
                friendlyError = "This email address is already in use"
            }else if(err.code === "auth/weak-password"){
                friendlyError = "Password is too weak."
            }
            setError(friendlyError);
            console.error("Firebase sign-up error: ",err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-sky-100 font-sans">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
                    <p className="mt-2 text-gray-500">Join the conversation!</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        // autoComplete="username"
                        />
                    </div>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        // autoComplete="new-password"
                        />
                    </div>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-xs text-center text-gray-400">
                    Already have an account? <a href='./login' className="font-semibold text-indigo-500 hover:underline focus:outline-none">Log in</a>
                </p>
            </div>
        </div>
    );
}

export default page
