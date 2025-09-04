"use client"
import React, { useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// You might want to import the Link component from Next.js for client-side navigation
// import Link from 'next/link';

const HomePage = () => {

    const router = useRouter();

    useEffect(()=>{
        const isLoggedIn = onAuthStateChanged(auth,(currUser)=>{
            if(currUser){
                router.push('/homepage');
            }
        })
    })

  return (
    <div className="min-h-screen bg-sky-100 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Chatterly</h1>
          <nav>
            {/* In a real Next.js app, you would use <Link href="/login"> */}
            <a href="/auth/login" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition mr-2">
              Login 
            </a>
            <a href="/auth/signup" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition ml-2">
              Sign Up
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 text-center">
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Connect and Chat, <br /> Instantly.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to Chatterly, the simplest way to stay in touch with your friends and colleagues. Join the conversation today!
          </p>
          {/* In a real Next.js app, you would use <Link href="/login"> */}
          <a href="#" className="inline-block px-8 py-4 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105">
            Get Started
          </a>
        </div>
      </main>

       {/* Features Section */}
       <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold">Why you'll love Chatterly</h3>
                    <p className="text-gray-500 mt-2">All the features you need for a seamless chat experience.</p>
                </div>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/3 px-4 mb-8">
                        <div className="p-8 rounded-xl shadow-lg border border-gray-100 h-full">
                            <h4 className="text-2xl font-bold mb-3">Real-time Messaging</h4>
                            <p className="text-gray-600">Messages are delivered instantly without any delay. Experience fluid conversations just like you're talking in person.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-8">
                        <div className="p-8 rounded-xl shadow-lg border border-gray-100 h-full">
                            <h4 className="text-2xl font-bold mb-3">Clean Interface</h4>
                            <p className="text-gray-600">A simple, intuitive, and clutter-free interface that lets you focus on what matters most: the conversation.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-8">
                        <div className="p-8 rounded-xl shadow-lg border border-gray-100 h-full">
                            <h4 className="text-2xl font-bold mb-3">Secure & Private</h4>
                            <p className="text-gray-600">Your privacy is our priority. We ensure your conversations are kept secure and private from prying eyes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Chatterly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
