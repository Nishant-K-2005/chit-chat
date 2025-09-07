"use client"
import React, { useState } from 'react';
import { StepBack } from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

// --- Mock User Data ---
// const initialUser = {
//     name: 'Sarah Miller',
//     email: 'sarah.miller@example.com',
//     avatar: 'https://placehold.co/150x150/E2E8F0/4A5568?text=SM'
// };
// --- End Mock Data ---

const ProfilePage = () => {
    const profile = useUser();
    // console.log(profile); // ----------DEBUGING
    const [user, setUser] = useState(profile.profile);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.displayName);
    const router = useRouter();

    // State for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleProfileSave = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        setUser({ ...user, name: name });
        console.log('Profile updated:', { name });
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Add validation
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        if (!currentPassword || !newPassword) {
            alert("Please fill out all password fields.");
            return;
        }
        // In a real app, you would send this to your backend for verification and update
        console.log('Password change requested for:', user.email);
        alert('Password changed successfully! (Simulated)');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            router.push('/auth/login');
        } catch (err) {
            console.log("Error logging out", err.message);
        }
    }

    return (
        <div className="min-h-screen bg-sky-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">

                <div className='mt-10 flex gap-5 items-center h-20'>
                    <Link href='/homepage' className='mt-2 px-2 py-2 font-semibold text-white rounded-lg'>
                        <StepBack size={36} strokeWidth={2.5} color='#4f46e5' />
                    </Link>
                    <h1 className="text-3xl font-bold text-indigo-600">Account Settings</h1>
                </div>

                {/* Profile Information Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                    <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                        <div className="relative">
                            <img src={user.photoURL} alt="Profile Avatar" className="w-32 h-32 rounded-full" />
                            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleProfileSave} className="flex-1 w-full">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-200"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-transparent rounded-lg cursor-not-allowed"
                                />
                            </div>
                            {isEditing ? (
                                <button type="submit" className="px-5 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                                    Save Changes
                                </button>
                            ) : (
                                <button type="button" onClick={() => setIsEditing(true)} className="px-5 py-2 font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                                    Edit Profile
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-xl font-bold mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="px-5 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Logout Button */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-red-600">Logout</h2>
                    <p className="text-gray-600 mb-4">Are you sure you want to log out of your account?</p>
                    <button onClick={handleLogout} className="px-5 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition">
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
